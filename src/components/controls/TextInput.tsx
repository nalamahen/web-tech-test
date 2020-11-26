import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import React, { FC } from 'react';

const TextInput: FC<TextFieldProps & FieldAttributes<{}>> = ({
    placeholder,
    label,
    fullWidth,
    className,
    id,
    ...props
  }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
      <TextField
        {...field}
        helperText={errorText}
        placeholder={placeholder}
        label={label}
        id={id}
        variant="outlined"
        fullWidth={fullWidth}
        className={className}
        error={!!errorText}
      />
    );
  };

  export default TextInput;