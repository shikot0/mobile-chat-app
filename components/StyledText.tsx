import { Fonts } from '@/constants/Fonts';
import { Text, TextProps } from './Themed';

export function Heading(props: TextProps) {
  return (
    <Text 
      {...props} 
      style={[props.style, {
        paddingLeft: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 40,
        fontWeight: '500',
        // backgroundColor: 'grey',
        fontFamily: Fonts.Headings
      }
    ]} />
  )
}

export function SmallHeading(props: TextProps) {
  return (
    <Text 
      {...props} 
      style={[props.style, {
        // paddingLeft: 16,
        // paddingVertical: 12,
        // marginBottom: 16,
        fontSize: 28,
        fontWeight: '500',
        // backgroundColor: 'grey',
        fontFamily: Fonts.Headings
      }
  ]} />
  )
}

export function ListHeading(props: TextProps) {
  return (
    <Text 
      {...props} 
      style={[props.style, {
        // paddingLeft: 16,
        // paddingVertical: 12,
        // marginBottom: 16,
        fontSize: 40,
        fontWeight: '500',
        // backgroundColor: 'grey',
        fontFamily: Fonts.Headings
      }
    ]} />
  )
}