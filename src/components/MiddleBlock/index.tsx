import { Row, Col, Input } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { ChangeEventHandler, useState } from 'react';

interface MiddleBlockProps {
  title: string;
  content: string;
  button: string;
  t: TFunction;
}

const MiddleBlock = ({ title, content, button, t }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [inputValue, setInputValue] = useState('')
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <MiddleBlockSection>
      <Slide direction="up" triggerOnce>
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {/* START - INPUT THINGS */}
              <Input value={inputValue} onChange={handleInputChange} placeholder='Input things:' />
              {/* END - INPUT THINGS */}
              {button && (
                <Button name="submit" onClick={() => scrollTo("mission")}>
                  {inputValue ? inputValue : t(button)}
                  {/* {t(button)} */}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
