import React from 'react';
import { View, Text, TextInput, Image, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from '../../Components/LoadingModal';
import { Constants, Queries } from '../../Utils';
import Comments from './Comments';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { Header } from '../../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const MyaPlus = ({ navigation, route: { params } }) => {
  const [ blog, setBlog ] = React.useState({});
  const [ comment, setComment ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);
  const { user } = useSelector((state) => state.Account);

  // console.log("HERE's the user", params);

  React.useEffect(() => {
    const subscribe = Queries.documentRealTime(`Blogs`, params.id, (resp) => {
      // console.log('Single doc--', resp.doc);
      if (resp.doc) setBlog(resp.doc);
    });

    return subscribe;
  }, []);

  const createCommentHandler = async () => {
    setLoading(true);
    const { uid, imageUrl, email } = user;
    const dateCreated = new Date().toISOString();
    const batch = firestore().batch();
    var commentDocRef = firestore().collection('Blogs').doc(params.id);
    batch.set(
      commentDocRef,
      {
        comments: firestore.FieldValue.arrayUnion({ dateCreated, comment, userInfo: { uid, email, imageUrl } })
      },
      { merge: true }
    );

    await batch
      .commit()
      .then(() => {
        setComment('');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal visible={loading} />
      <Header navigation={navigation} title="Blog Details" />
      <View style={{ flexGrow: 1 }}>
        <Comments {...blog} setLoading={setLoading} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eeeeee80',
          maxHeight: RFValue(100),
          width: '100%',
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(5)
        }}
      >
        <Image
          source={{ uri: user.imageUrl || Constants.PROFILE_IMAGE }}
          style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(40) }}
        />
        <TextInput
          style={{
            marginHorizontal: RFValue(10),
            fontSize: RFValue(14),
            paddingHorizontal: RFValue(10),
            width: '70%',
            backgroundColor: '#eee',
            height: '100%'
          }}
          placeholder="Leave your comment here..."
          // multiline
          value={comment}
          onChangeText={(cmt) => setComment(cmt)}
          onSubmitEditing={createCommentHandler}
        />
        <Pressable
          onPress={createCommentHandler}
          style={{
            width: RFValue(40),
            height: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="send" size={RFValue(25)} color="#aaa" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MyaPlus;
