import styled from "@emotion/styled";
import { css } from "@emotion/core";
import chevronDown from "../assets/chevronDown.svg";

/** Dropdown */
export const DropdownWrapper = styled.div`
  padding: 0.5rem;
`;

export const dropdownStyle = css`
  ${inputStyle}
  appearance: none;
  background-image: url(${chevronDown});
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding: 0.5rem 2rem 0.5rem 1rem;
`;

/** Input */
export const inputStyle = css`
  appearance: none;
  background: none;
  border: 1px solid var(--color-primary);
  color: white;
  font-family: var(--font-family-secondary);
  font-weight: 500;
  max-width: 14rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-accent);
    outline: none;
  }

  /* Hide the up and down arrows for number input */
  &[type="number"]::-webkit-inner-spin-button {
    opacity: 0;
  }
`;

export const InputWrapper = styled.div`
  padding: 0.5rem;
`;

/** Input with Button */

export const customInputStyle = css`
  padding: 0.5rem 2.25rem 0.5rem 1rem;
`;

export const customButtonStyle = css`
  position: absolute;
  height: 1.25rem;
  width: 2rem;
  top: 32;
  right: 48;
`;

export const Wrapper = styled.div`
  position: relative;
`;
