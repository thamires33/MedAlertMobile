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
    backgroundColor: '#f8f8f8', // Cor de fundo do cabeçalho
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
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default styles; 