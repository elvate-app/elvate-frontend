import { ButtonProps, DialogProps, styled } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "src/components/Button/LoadingButton";
import InputWithMax from "src/components/Inputs/InputWithMax";
import { Flex, FlexCenterColumn, FlexColumn } from "src/components/Layout/Flex";
import { Subtitle1, Subtitle3 } from "src/components/Typo";
import { isNumber } from "src/utils/number";
import { ModalToolbar, ModalToolbarProps, StyledDialog } from "..";

const Content = styled(FlexColumn)`
  background: ${({ theme }) => theme.palette.background.darker};
  padding: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`;

const InputContainer = styled(Flex)`
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

const ButtonContainer = styled(Flex)`
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

export type GenericModalProps = {
  max: string | undefined;
  decimal: number;
} & DialogProps &
  ModalToolbarProps;

export type GenericModalButtonProps = Omit<ButtonProps, "onClick"> & {
  onClick: (amount: string, decimal: number) => Promise<void>;
  closeOnFinish?: boolean;
};

export type GenericModalButtonsProps = {
  buttons: Array<GenericModalButtonProps>;
};

const GenericModal: React.FC<GenericModalProps & GenericModalButtonsProps> = ({
  title,
  max,
  decimal,
  onCancel,
  buttons,
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    if (isNumber(event.target.value) || event.target.value === "") {
      setValue(event.target.value);
    }
  };

  const handleMax = (max: string) => {
    setValue(max);
  };

  return (
    <StyledDialog {...props}>
      <ModalToolbar title={title} onCancel={onCancel} />
      <FlexCenterColumn>
        <Content>
          <Subtitle3>Available</Subtitle3>
          <Subtitle1>{max}</Subtitle1>
        </Content>

        <InputContainer>
          <InputWithMax
            value={value}
            max={max || "0"}
            onMaxClick={handleMax}
            onChange={handleInputChange}
            fullWidth
          />
        </InputContainer>
        <ButtonContainer>
          {buttons.map(
            (
              {
                onClick,
                closeOnFinish = true,
                ...props
              }: GenericModalButtonProps,
              index: number
            ) => (
              <LoadingButton
                key={`genericModal-${index}`}
                onClick={async () => {
                  await onClick(value, decimal);
                  if (closeOnFinish) onCancel();
                }}
                {...props}
              />
            )
          )}
        </ButtonContainer>
      </FlexCenterColumn>
    </StyledDialog>
  );
};

export default GenericModal;
