import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8', 
  },
  menuIconContainer: {
    padding: 8,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTextRegular: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIconContainer: {
    padding: 8,
  },
 // profileIcon: {
   // width: 32,
   // height: 32,
  //  borderRadius: 16,
 // },
  card: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfContainer: {
    flex: 1,
    marginRight: 8,
  },

  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  cameraButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  takenPhoto: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },


});
export default styles;