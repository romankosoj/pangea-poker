import React from "react";
import styled from "@emotion/styled";
import Modal from "../Modal";
import Deposit from "./Deposit";
import { Button } from "../Controls";
import { updateStateValue } from "../../store/actions";
import { IState } from "../../store/initialState";

// This modal opens up when the player clicks the Cashier button and allows the player to
// move funds to and away from the account

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const CashierButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  z-index: 998;
`;

const Cashier: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  const openCashier = () => (): void => {
    updateStateValue("isCashierOpen", true, dispatch);
  };

  return (
    <React.Fragment>
      {!state.isStartupModal && state.nodeType !== "dealer" && (
        <CashierButton>
          <Button label="Cashier" onClick={openCashier()} small></Button>
        </CashierButton>
      )}
      <Modal
        isOpen={state.isCashierOpen}
        tabs={[
          {
            content: <Deposit dispatch={dispatch} state={state} />,
            name: "Deposit",
            title: "Deposit CHIPS"
          }
          // {
          //   title: "Withdraw",
          //   content: <Withdraw />
          // }
        ]}
      />
    </React.Fragment>
  );
};

export default Cashier;
