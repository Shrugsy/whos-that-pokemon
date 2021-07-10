import { css } from '@emotion/react';
import { Button, ButtonProps } from '@material-ui/core';

const styles = css`
  text-transform: none;

  &.Mui-disabled {
    background-color: #00000047;
    color: #f1f1f18f;
  }
`;

/**
 * An MUI button with some presets
 */
export function StyledButton({ variant = 'contained', color = 'primary', ...props }: ButtonProps) {
  return <Button css={styles} variant={variant} color={color} {...props} />;
}
