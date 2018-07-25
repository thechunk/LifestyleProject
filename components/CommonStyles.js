import { StyleSheet, PixelRatio } from 'react-native';

const standardFontSize = PixelRatio.get() <= 2 ? 12 : 13;
const titleBarFontSize = PixelRatio.get() <= 2 ? 13 : 14;
const formInputFontSize = titleBarFontSize;
const formInputLargeFontSize = PixelRatio.get() <= 2 ? 24 : 26;
const standardHeaderFontSize = PixelRatio.get() <= 2 ? 18 : 18;
const bigHeaderFontSize = PixelRatio.get() <= 2 ? 30 : 30;

const CommonStyles = StyleSheet.create({
  standardContainer: {
    flex: 1,
  },
  bgDeepBlue: {
    backgroundColor: 'rgb(0, 23, 90)',
  },
  bgBrightBlue: {
    backgroundColor: 'rgb(0, 111, 207)',
  },
  colorBrightBlue: {
    color: 'rgb(0, 111, 207)',
  },
  colorGreen: {
    color: 'rgb(63, 156, 53)',
  },
  colorRed: {
    color: 'rgb(180, 44, 1)',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  colorWhite: {
    color: 'white',
  },
  fontTitleBarButton: {
    fontFamily: 'Roboto',
    fontSize: titleBarFontSize,
    fontWeight: '500',
  },
  fontTableHeadingEm: {
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
    fontWeight: '500',
  },
  fontTableHeading: {
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
  },
  fontBody: {
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
  },
  fontBodyEm: {
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
    fontWeight: '500',
  },
  fontFormLabel: {
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
  },
  fontFormInput: {
    fontFamily: 'Roboto',
    fontSize: formInputFontSize,
  },
  fontFormLargeInput: {
    fontFamily: 'Roboto',
    fontSize: formInputLargeFontSize,
  },
  formInputStyle: {
    color: 'black',
    marginTop: 4,
  },
  touchableSubmitButton: {
    padding: 14,
  },
  touchableSubmitButtonText: {
    letterSpacing: 0.5,
    fontFamily: 'Roboto',
    fontSize: standardFontSize,
  },
  bottomSeparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(200, 201, 199)',
  },
  progressBar: {
    backgroundColor: 'white',
    flex: 1,
    flexBasis: '100%',
    height: 4,
    justifyContent: 'center',
  },
  bigHeaderContainer: {

  },
  fontBigHeader: {
    fontFamily: 'Roboto',
    fontSize: bigHeaderFontSize,
    padding: 11,
    paddingTop: '20%',
  },
  fontStandardHeader: {
    fontFamily: 'Roboto',
    fontSize: standardHeaderFontSize,
  }
});
export default CommonStyles;
