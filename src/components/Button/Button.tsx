import React from 'react';

export interface ButtonProps {
  label?: string;
  clickHandler?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className="Button" onClick={() => props.clickHandler && props.clickHandler()}>
      {props.label}
    </button>
  );
};

Button.defaultProps = {
  label: 'default button',
};
