import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { HelperFunctions, Queries } from '../../../Utils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SingleBlog = React.memo(({ setLoading, ...props }) => {
  console.log('State', props.id);

  const likeHandler = async () => {
    setLoading(true);
    const likes =
      props.likes.indexOf(auth().currentUser.uid) === -1
        ? [ ...props.likes, auth().currentUser.uid ]
        : props.likes.filter((item) => item !== auth().currentUser.uid);

    await Queries.updateDoc('Blogs', props.id, { likes }, () => {
      console.log('Done updating');
      setLoading(false);
    });
  };

  return (
    <View
      style={{
        marginBottom: props.last ? RFValue(50) : RFValue(20),
        borderBottomWidth: props.last ? 0 : 0.5,
        borderBottomColor: '#ddd',
        paddingBottom: RFValue(20)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          marginVertical: RFValue(10),
          alignItems: 'center',
          paddingHorizontal: RFValue(10)
          // marginBottom: RFValue(1)
        }}
      >
        <Pressable onPress={() => alert('')}>
          <Image
            source={{ uri: props.profileUrl }}
            style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(40) }}
          />
        </Pressable>
        <View style={{ marginLeft: RFValue(10) }}>
          <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{props.email}</Text>
          <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>{moment(props.dateCreated).fromNow()}</Text>
        </View>
      </View>

      {props.imageUrl ? (
        <Image source={{ uri: props.imageUrl }} style={{ width: '100%', height: RFValue(300) }} resizeMode="cover" />
      ) : null}
      <View
        style={{
          backgroundColor: props.imageUrl ? '#eeeeee70' : '#eee',
          padding: RFValue(10)
        }}
      >
        <Text
          style={{
            fontSize: props.imageUrl ? RFValue(14) : RFValue(20),
            fontWeight: props.imageUrl ? 'normal' : 'bold'
          }}
        >
          {props.caption}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: RFValue(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: RFValue(10)
        }}
      >
        <View>
          <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>
            {props.comments && props.comments.length} comments ・ {props.likes && props.likes.length} likes
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Icon
            name={props.likes && props.likes.includes(auth().currentUser.uid) ? 'heart' : 'heart-outline'}
            size={RFValue(30)}
            color="#000"
            onPress={likeHandler}
          />
          <Icon
            name="share"
            size={RFValue(30)}
            color="#000"
            style={{ marginHorizontal: RFValue(10), marginRight: props.imageUrl ? RFValue(10) : 0 }}
          />
          {props.imageUrl ? <Icon name="download" size={RFValue(30)} color="#000" /> : null}
        </View>
      </View>
    </View>
  );
});

export default SingleBlog;
