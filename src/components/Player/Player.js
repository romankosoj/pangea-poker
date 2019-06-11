import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card";
import randomEmoji from "../../lib/randomEmoji";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
import cardBg from "../Card/cards/bg-red.svg";

const Player = props => {
  return (
    <div
      css={css`
        grid-area: ${props.seat};
        position: relative;
      `}
    >
      {/* Show my cards if I have them */}
      {props.isMe && props.hasCards && (
        <div
          css={css`
            bottom: 0.875rem;
            left: 1.75rem;
            position: absolute;
            z-index: 1;
          `}
        >
          <Card card={props.myCards[0]} />
          <Card card={props.myCards[1]} />
        </div>
      )}
      {/* Show other players' cards if they have them */}
      {!props.isMe && props.hasCards && (
        <div
          css={css`
            bottom: 0;
            left: 3rem;
            position: absolute;
            z-index: 1;
          `}
        >
          <img src={cardBg} alt="" />
          <img
            src={cardBg}
            css={css`
              position: relative;
              left: -2.25rem;
            `}
            alt=""
          />
        </div>
      )}
      <div
        css={css`
          align-items: center;
          display: grid;
          background: ${theme.moon.colors.background};
          border-radius: 10rem;
          box-sizing: border-box;
          box-shadow: inset 0 0 0.25rem rgba(255, 255, 255, 0.1);
          grid-template-columns: 1fr 0.5fr;
          height: 100%;
          justify-content: center;
          position: absolute;
          width: 100%;
          z-index: 2;
        `}
      >
        <span
          css={css`
            margin-left: 1rem;
          `}
        >
          <div
            css={css`
              color: ${theme.moon.colors.superLightGray};
              font-size: 0.625rem;
              line-height: 0.875rem;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            {props.seat}
          </div>
          <div
            css={css`
              color: ${theme.moon.colors.primaryLight};
              font-size: 0.75rem;
              line-height: 1rem;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            {numberWithCommas(props.chips)}
          </div>
        </span>
        <span
          css={css`
            font-size: 1.875rem;
            margin-right: 1rem;
          `}
        >
          {randomEmoji()}
        </span>
      </div>
    </div>
  );
};

export default Player;