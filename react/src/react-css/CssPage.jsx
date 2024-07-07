import styled from "@emotion/styled";
import React from "react";

const CssPage = () => {
  return (
    <>
      <ParentContainer>
        <CenterBox>
          <TextSpan>center</TextSpan>
        </CenterBox>
      </ParentContainer>

      {/* <BoxContainer>
        <FixedBox>
          <TextSpan>fixed</TextSpan>
        </FixedBox>
        <Box>
          <TextSpan>static</TextSpan>
          <TextSpan>static</TextSpan>
        </Box>
        <StickyBox>
          <TextSpan>sticky</TextSpan>
          <TextSpan>sticky</TextSpan>
          <TextSpan>sticky</TextSpan>
        </StickyBox>
      </BoxContainer> */}

      <BoxContainer>
        <FixedBox>
          <TextSpan>fixed</TextSpan>
        </FixedBox>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <TextSpan>static</TextSpan>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <StickyBox>
          <TextSpan>sticky</TextSpan>
        </StickyBox>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <TextSpan>static</TextSpan>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <StickyBox>
          <TextSpan>sticky</TextSpan>
        </StickyBox>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <TextSpan>static</TextSpan>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <StickyBox>
          <TextSpan>sticky</TextSpan>
        </StickyBox>
      </BoxContainer>

      <BoxContainer>
        <Box>
          <TextSpan>static</TextSpan>
        </Box>
      </BoxContainer>

      <BoxContainer>
        <StickyBox>
          <TextSpan>sticky</TextSpan>
        </StickyBox>
      </BoxContainer>

      <ImageContainer>
        <Image src="https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?w=2000" />
        <Image src="https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?w=2000" />
        <Image src="https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?w=2000" />
      </ImageContainer>
    </>
  );
};

const BoxContainer = styled.div`
  /* height: 1500px; */
  background-color: lightblue;
  display: inline-flex;
  /* display: flex; */
  border: 1px solid blue;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid gray;
  background-color: violet;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: center;
  /* align-items: flex-end; */
  align-items: center;
  font-size: 16px;
  /* line-height: 100px; */
  /* text-align: center; */
  /* padding: 2rem 0; */
`;

const ParentContainer = styled.div`
  background-color: lightpink;
`;

const CenterBox = styled.div`
  width: 20%;
  height: 10%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
`;

const FixedBox = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: lightgreen;
`;

const StickyBox = styled(Box)`
  position: -webkit-sticky;
  position: sticky;
  width: 100px;
  /* height: 100px; */
  top: 0;
  right: 100;
  background-color: lightcoral;
`;

const TextSpan = styled.span`
  /* vertical-align: middle; */
  background-color: orange;
`;

const ImageContainer = styled.div`
  background-color: lightslategray;
  /* line-height: 0; */
`;

const Image = styled.img`
  /* display: block; */
  width: 150px;
  vertical-align: top;
`;

export default CssPage;
