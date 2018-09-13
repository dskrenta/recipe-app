import { Platform, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const iPhoneStyle = (x, i, a) => {
    const ios = Platform.OS === 'ios';
    const isX = (height / width).toFixed(2) == 2.17;
    
    if (isX && ios) {
        return x;
    } 
    else if (ios) {
        return i;
    }
    else {
        return a;
    }
}