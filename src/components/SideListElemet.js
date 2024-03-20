import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Element } from "./Element";

export const SideListElemet = ({
  subModuleData,
  eventKey,
  isActiveModule,
  activeVideoIndex,
  setters,
  moduleIndex,
}) => {
  const [fontWeight, setFontWeight] = useState("normal");
  useEffect(() => {
    if (isActiveModule) setFontWeight("bold");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccordionBody = () => {
    const bgColor = ["#B2BEB5", "#E5E4E2"];
    if (subModuleData && subModuleData.videoList)
      return subModuleData.videoList.map((videoData, index) => {
        if ((index === activeVideoIndex) && isActiveModule)
          return (
            <Element
              videoData={videoData}
              key={index}
              bgColor={"#32de84"}
              videoIndex={index}
              moduleIndex={moduleIndex}
              setters={setters}
              isActive={true}
            />
          );
        else
          return (
            <Element
              videoData={videoData}
              key={index}
              bgColor={bgColor[index % 2]}
              videoIndex={index}
              moduleIndex={moduleIndex}
              setters={setters}
              isActive={false}
            />
          );
      });
    else return null;
  };
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>
          <div style={{ fontWeight }}>{subModuleData.name}</div>
        </Accordion.Header>
        <Accordion.Body style={{ padding: 0 }}>
          {getAccordionBody()}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};
