import React from "react";
import { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DispatchContext, StateContext } from "../../store/context";
import { closeStartupModal, game, updateStateValue } from "../../store/actions";
import { IState } from "../../store/initialState";
import Button from "../Controls/Button";
import { ModalButtonsWrapper } from "./assets/style";
import { Input } from "../Form";
import { isDev } from "../../lib/dev";
import development from "../../config/development.json";

interface INode {
  name: "dcv" | "player";
  type: "dealer" | "player";
  tableId: string;
  devAddress: string;
}

// Nodes to input

const nodesToInput: INode[] = [
  {
    name: "dcv",
    id: "dealer",
    type: "dealer",
    tableId: "",
    devAddress: process.env.DEV_SOCKET_URL_DCV
  },
  {
    name: "player",
    id: "player",
    type: "player",
    devAddress: process.env.DEV_SOCKET_URL_PLAYER
  }
];

const CustomIP: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const [nodes, setNodes] = useState({
    dcv: process.env.DEV_SOCKET_URL_DCV,
    player: process.env.DEV_SOCKET_URL_PLAYER
  });
  const [nodeType, setNodeType] = useState("dealer");
  const [canSetNodes, setCanSetNodes] = useState(false);

  // Event handlers
  const handleTabClick = (nodeType: "dealer" | "player") => (): void => {
    // Update the node type
    setNodeType(nodeType);
  };

  const handleSubmit = () => (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // Set the node addresses and the node type
    const isDealer = nodeType === "dealer";
    const nodesToSet = isDealer ? { dcv: nodes.dcv } : { player: nodes.player };

    const nodeTypeToSet: string = isDealer ? "dealer" : "player";

    updateStateValue("nodes", nodesToSet, dispatch);
    updateStateValue("nodeType", nodeTypeToSet, dispatch);

    // Start the game if it's a player node
    !isDealer && game({ gametype: "", pot: [0] }, state, dispatch);

    // @todo check if the user was succesfully connected

    // Close the Startup Modal
    closeStartupModal(dispatch);
  };

  const handleInputChange = (node: INode) => (
    e: ChangeEvent<Element>
  ): void => {
    const target = e.target as HTMLInputElement;
    // @todo NODE_ENV variable is always development for some reason
    // const ip: string = isDev ? development.ips[node.name] : target.value;
    setNodes({
      ...nodes,
      [node.name]: target.value
    });
  };

  // Validates whether all required input fields have data
  useEffect((): void => {
    if (nodeType === "dealer") {
      nodes.dcv ? setCanSetNodes(true) : setCanSetNodes(false);
    }
    if (nodeType === "player") {
      nodes.player ? setCanSetNodes(true) : setCanSetNodes(false);
    }
  }, [nodes, nodeType]);

  return (
    <form>
      <Tabs>
        <TabList>
          <Tab onClick={handleTabClick("dealer")} data-test="tab-dealer">
            Dealer
          </Tab>
          <Tab onClick={handleTabClick("player")} data-test="tab-player">
            Player
          </Tab>
        </TabList>

        {nodesToInput.map((node, key) => {
          return (
            <TabPanel key={key}>
              <Input
                defaultValue={""}
                label={node.name}
                name={node.name}
                onChange={handleInputChange(node)}
                placeholder={`${node.name}'s IP Address`}
                type={"text"}
              />
            </TabPanel>
          );
        })}
      </Tabs>
      <ModalButtonsWrapper>
        <Button
          label="Set Nodes"
          disabled={!canSetNodes}
          onClick={handleSubmit()}
          data-test="set-nodes-button"
        />
      </ModalButtonsWrapper>
    </form>
  );
};

export default CustomIP;
