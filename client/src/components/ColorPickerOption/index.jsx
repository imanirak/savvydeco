import {
    chakra,
    Circle,
    Icon,
    useColorModeValue,
    useRadio,
    useTheme,
    VisuallyHidden,
  } from '@chakra-ui/react'
  import { isDark } from '@chakra-ui/theme-tools'
  import { FiCheck } from 'react-icons/fi'
  
  export const ColorPickerOption = (props) => {
    const { color, value } = props
    const { getInputProps, htmlProps, getCheckboxProps, getLabelProps, state } = useRadio(props)
    const theme = useTheme()
    return (
      <chakra.label cursor="pointer" {...htmlProps}>
        <chakra.input {...getInputProps()} />
        <Circle
          size="10"
          borderWidth="1px"
          _checked={{
            borderWidth: '2px',
            borderColor: useColorModeValue('blue.500', 'blue.200'),
          }}
          {...getCheckboxProps()}
        >
          <Circle size="8" bg={color}>
            {state.isChecked && (
              <Icon as={FiCheck} color={isDark(color)(theme) ? 'white' : 'gray.900'} />
            )}
          </Circle>
        </Circle>
        <VisuallyHidden {...getLabelProps()}>{value} color selected</VisuallyHidden>
      </chakra.label>
    )
  }