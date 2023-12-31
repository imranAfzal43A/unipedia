import { StyleSheet } from 'react-native';
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  settigsScreens: {
    flex: 1,

    backgroundColor: '#fff',
  },
  fastLoginButton: {
    width: '80%',
    height: 50,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 4,
  },
  contactButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    height: 50,
    borderRadius: 43,
    borderColor: '#E367A6',
    borderWidth: 2,
    alignSelf: 'center',
    margin: 4,
    bottom: 20,
  },
  Button: {
    width: '80%',
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E367A6',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  ButtonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'RB',
  },
  textStyle: {
    height: 50,
    padding: 6,
    paddingLeft: 12,
    alignSelf: 'center',
    fontFamily: 'RM',
    fontSize: 14,
    marginRight: 5,
    marginLeft: 5,
    textAlign: 'justify',
  },
  appBarTitle: {
    fontSize: 16,
    position: 'absolute',
    top: 16,
    fontFamily: 'RM',
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#E367A6',
    borderRadius: 10,
    padding: 6,
  },

  subject: {
    fontFamily: 'RR',
    fontSize: 10,
    textAlign: 'justify',
  },
  teacher: {
    fontFamily: 'RB',
    fontSize: 14,
    textAlign: 'justify',
  },
  source: {
    fontFamily: 'RR',
    fontSize: 10,
    textAlign: 'justify',
  },
  notesCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 4,
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D4D4D4',
  },
});
export default style;
export const appColor = '#CB61C5';
