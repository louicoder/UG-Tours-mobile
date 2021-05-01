import React from 'react';
import { View, Text, Pressable, TextInput, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants, HelperFunctions } from '../../../Utils';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from '../../SingleDoctorProfile/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Button } from '../../../Components';
import auth from '@react-native-firebase/auth';

const Reschedule = ({ rescheduleAppointment, ...props }) => {
  const inputRef = React.useRef(null);
  const [ state, setState ] = React.useState({
    time: '8:00 - 9:00',
    timeShowing: false,
    calShowing: true,
    description: '',
    // date: new Date().toISOString(),
    ...props
  });

  console.log('PROps', props);

  return (
    <View
      keyboardShouldPersistTaps="handled"
      style={{
        width: '100%',
        backgroundColor: '#fff',
        paddingBottom: useSafeAreaInsets().bottom,
        paddingHorizontal: RFValue(10)
      }}
    >
      <Pressable
        style={styles.descText}
        onPressIn={() => {
          setState({ ...state, calShowing: !state.calShowing, timeShowing: false });
          Keyboard.dismiss();
        }}
      >
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Select date:</Text>
        <Text style={styles.dateTimeText}>{moment(state.date).format('DD-MMMM-YYYY')}</Text>
        <View style={styles.dropIcon}>
          <Icon name={state.calShowing ? 'chevron-up' : 'chevron-right'} size={RFValue(20)} />
        </View>
      </Pressable>

      {state.calShowing && (
        <View style={{ width: '100%' }}>
          <Calendar
            hideExtraDays
            style={{ width: '100%' }}
            current={moment(state.date).format('YYYY-MM-DD')}
            minDate={moment(new Date()).format('YYYY-MM-DD')}
            enableSwipeMonths={true}
            onDayPress={({ dateString }) => {
              setState({ ...state, date: moment(dateString).toISOString() });
            }}
            markingType="multi-dot"
            markedDates={{
              [moment(state.date).format('YYYY-MM-DD')]: {
                selected: true,
                selectedColor: Constants.green
              }
            }}
          />
        </View>
      )}

      <Pressable
        style={styles.descText}
        onPressIn={() => setState({ ...state, timeShowing: !state.timeShowing, calShowing: false })}
      >
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Select time:</Text>
        <Text style={styles.dateTimeText}>{state.time || 'No time selected'}</Text>
        <View style={styles.dropIcon}>
          <Icon name={state.timeShowing ? 'chevron-up' : 'chevron-right'} size={RFValue(20)} />
        </View>
      </Pressable>
      {state.timeShowing && (
        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {Constants.timeSlots.map((time) => {
            const selected = state.time === time;
            return (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                onPressIn={() => setState({ ...state, time })}
                style={{
                  width: '32%',
                  paddingVertical: RFValue(10),
                  backgroundColor: selected ? Constants.green : '#eee',
                  marginBottom: RFValue(7),
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: selected ? '#fff' : '#000',
                    fontWeight: selected ? 'bold' : 'normal'
                  }}
                >
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
        Enter desciption on why your would like to make an appointment with the doctor:
      </Text>
      <TextInput
        placeholder="Enter desciption for appointment"
        placeholderTextColor="#aaa"
        style={{
          backgroundColor: '#eee',
          maxHeight: RFValue(50),
          minHeight: RFValue(50),
          padding: RFValue(10),
          paddingTop: Platform.OS === 'ios' ? RFValue(10) : 0,
          fontSize: RFValue(14),
          marginBottom: RFValue(10)
        }}
        value={state.description}
        multiline
        ref={inputRef}
        onFocus={() => setState({ ...state, timeShowing: false, calShowing: false })}
        onBlur={() => Keyboard.dismiss()}
        onChangeText={(description) => setState({ ...state, description })}
      />

      <Button
        title="Book Appointment"
        extStyles={{ borderWidth: 0, backgroundColor: Constants.darkGreen }}
        textStyles={{ color: '#fff' }}
        onPressIn={() => {
          const { date, time, description, ...rest } = state;
          Keyboard.dismiss();
          const payload = {
            date,
            description,
            time,
            confirmed: false
          };
          return rescheduleAppointment(props.id, payload);
        }}
      />
      <View style={{ height: 20 }} />
    </View>
  );
};

export default Reschedule;
