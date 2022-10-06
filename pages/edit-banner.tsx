import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from '../components/Posts'
import Panel from '../components/Panel'
import Tabs from '../components/Tabs'
import { FaCaretDown, FaRegPlusSquare } from 'react-icons/fa'
import { SketchPicker } from 'react-color'
import { Checkbox, Slider, InputNumber } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import Link from 'next/link'
import { NumericFormat } from 'react-number-format'


const CheckboxGroup = Checkbox.Group;

const onPageOptions = [' Home page', ' Cart page', ' Product page', ' Collection page'];
const onDeviceOptions = [' PC', ' Mobile'];

const Home: NextPage = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [color, setColor] = useState('#1f1f1f');
  const [txtcolor, setTxtColor] = useState('#f6f6f7');
  const [opacity, setOpacity] = useState('100%');
  const [font, setFont] = useState('Inter');
  const [size, setSize] = useState('20px');
  const [bannerText, setBannerText] = useState('Free Shipping for orders over');
  const [bannerNum, setBannerNum] = useState(1000000);
  const [imgSel, setImgSel] = useState('');
  const [imgBackground, setImgBackground] = useState('');

  const [opacityValue, setOpacityValue] = useState(100);
  const [sizeValue, setSizeValue] = useState(20);

  const onOpacityChange = (newValue: any) => {
    setOpacityValue(newValue);
    setOpacity(newValue + "%");
  };
  const onSizeChange = (newValue: any) => {
    setSizeValue(newValue);
    setSize(newValue + "px");
  };

  const [checkedList1, setCheckedList1] = useState<CheckboxValueType[]>();
  const [checkedList2, setCheckedList2] = useState<CheckboxValueType[]>();
  const [indeterminate1, setIndeterminate1] = useState(true);
  const [indeterminate2, setIndeterminate2] = useState(true);
  const [checkAll1, setCheckAll1] = useState(false);
  const [checkAll2, setCheckAll2] = useState(false);

  const onCheckboxChange1 = (list: CheckboxValueType[]) => {
    setCheckedList1(list);
    setIndeterminate1(!!list.length && list.length < onPageOptions.length);
    setCheckAll1(list.length === onPageOptions.length);
  };
  const onCheckboxChange2 = (list: CheckboxValueType[]) => {
    setCheckedList2(list);
    setIndeterminate2(!!list.length && list.length < onDeviceOptions.length);
    setCheckAll2(list.length === onDeviceOptions.length);
  };

  const onCheckAllChange1 = (e: CheckboxChangeEvent) => {
    setCheckedList1(e.target.checked ? onPageOptions : []);
    setIndeterminate1(false);
    setCheckAll1(e.target.checked);
  };
  const onCheckAllChange2 = (e: CheckboxChangeEvent) => {
    setCheckedList2(e.target.checked ? onDeviceOptions : []);
    setIndeterminate2(false);
    setCheckAll2(e.target.checked);
  };

  return <div>
    <BannerTitleDiv>
      <BannerTitleSub>Banner App / Edit Banner</BannerTitleSub>
      <BannerTitle type='text' placeholder='Name of the Banner' />
    </BannerTitleDiv>

    <EditorDiv>
      <PreviewH5>Preview banner</PreviewH5>

      <BannerSection style={{ backgroundColor: color, opacity: opacity, backgroundImage: imgBackground }}>
        <div>
          <BannerText>
            <h3 style={{ color: txtcolor, fontSize: size, fontFamily: font }}>{bannerText} VND{bannerNum}</h3>
          </BannerText>
        </div>
      </BannerSection>

      <ButtonDiv>
        <Link href="/">
          <SecondaryButton>Cancel</SecondaryButton>
        </Link>
        <PrimaryButton>Next</PrimaryButton>
      </ButtonDiv>

      <Tabs>
        <Panel title="Template">
          <ScrollableDiv>
            <TabHeaderDiv>
              <TabHeaderH5>Template Select</TabHeaderH5>
            </TabHeaderDiv>

            <PanelTemplateDiv>
              <TemplateDiv>
                <EditorLabel>Basic Template</EditorLabel>
                <BannerTemplate style={{ backgroundColor: "red" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "green" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "blue" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "yellow" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "pink" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "orange" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "purple" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "black" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "grey" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "brown" }}></BannerTemplate>
              </TemplateDiv>

              <TemplateDiv>
                <EditorLabel>Premium Template</EditorLabel>
                <BannerTemplate style={{ backgroundColor: "red" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "green" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "blue" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "yellow" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "pink" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "orange" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "purple" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "black" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "grey" }}></BannerTemplate>
                <BannerTemplate style={{ backgroundColor: "brown" }}></BannerTemplate>
              </TemplateDiv>
            </PanelTemplateDiv>
          </ScrollableDiv>
        </Panel>
        <Panel title="Config Content">
          <ScrollableDiv>
            <TabHeaderDiv>
              <TabHeaderH5>Display Message</TabHeaderH5>
            </TabHeaderDiv>

            <EditorInputDiv>
              <EditorLabel>Initial Message</EditorLabel><br />

              <InputRowDiv>
                <EditorTextInput type='text' placeholder='Free Shipping for orders over' onChange={(event) => setBannerText(event.target.value)} />
                <EditorNumberInput type='number' defaultValue='1000000' step='500' onChange={(event) => setBannerNum(event.target.valueAsNumber)} />
                <EditorTextInput type='text' placeholder='Name of the Campaign' />
              </InputRowDiv>

              <EditorLabel>Progress Message</EditorLabel><br />

              <InputRowDiv>
                <EditorTextInput type='text' placeholder='Only' />
                <EditorNumberInput type='number' defaultValue='900000' step='500' />
                <EditorTextInput type='text' placeholder='Away from free shipping' />
              </InputRowDiv>

              <EditorLabel>Success Message</EditorLabel><br />
              <EditorTextInput type='text' placeholder='Congratulations! You have got free shipping!' />

            </EditorInputDiv>
            <TabHeaderDiv>
              <TabHeaderH5>Interaction</TabHeaderH5>
            </TabHeaderDiv>

            <EditorInputDiv>
              <StyledCheckbox> Add Link to the Bar (optional)</StyledCheckbox>
              <StyledCheckbox> Include Close Button</StyledCheckbox>

              <EditorLabel>Link</EditorLabel><br />
              <EditorTextInput type='text' placeholder='https://' />
            </EditorInputDiv>
          </ScrollableDiv>
        </Panel>
        <Panel title="Config Style">
          <ScrollableDiv>
            <TabHeaderDiv>
              <TabHeaderH5>Background Style</TabHeaderH5>
            </TabHeaderDiv>

            <InputRowDiv>
              <InputGroupDiv>
                <EditorLabel>Background Color</EditorLabel>

                <ColorButton onClick={() => setShow(!show)}>
                  <ColorButtonPreview style={{ backgroundColor: color }}></ColorButtonPreview>
                  {color}
                  <FaCaretDown />
                </ColorButton>
                {
                  show ? <div style={{ zIndex: 1000, position: 'absolute' }}>
                    <StyledColorPicker
                      color={color}
                      onChangeComplete={(color) => { setColor(color.hex) }} />
                  </div> : null
                }
              </InputGroupDiv>

              <InputGroupDiv>
                <EditorLabel>Image</EditorLabel>

                <ImageButton onClick={() => setShow2(!show2)}>
                  <ImageButtonPreview></ImageButtonPreview>
                  Select an image
                </ImageButton>
                {
                  show2 ? <ImageSelectDiv>
                    <ImageSelectTitleDiv>
                      <TabHeaderH5>Select an image</TabHeaderH5>
                    </ImageSelectTitleDiv>

                    <ImageTemplateDiv>
                      <ImageTemplate>
                        <input type='file' name='imgUpload' accept=".jpg, .jpeg, .png" />
                        <span><FaRegPlusSquare style={{ width: '60%', height: '60%' }} /></span>
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://wallpaperaccess.com/full/6584451.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://wallpaperaccess.com/full/6584451.jpg' />
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://img.freepik.com/free-photo/warm-watercolor-banner_95678-429.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://img.freepik.com/free-photo/warm-watercolor-banner_95678-429.jpg' />
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://t3.ftcdn.net/jpg/04/53/92/04/360_F_453920448_yMcff4E8ctdXQQegdaQ7WcXnHM3y3aMM.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://t3.ftcdn.net/jpg/04/53/92/04/360_F_453920448_yMcff4E8ctdXQQegdaQ7WcXnHM3y3aMM.jpg' />
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://bbdniit.ac.in/wp-content/uploads/2020/09/banner-background-without-image-min.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://bbdniit.ac.in/wp-content/uploads/2020/09/banner-background-without-image-min.jpg' />
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg' />
                      </ImageTemplate>
                      <ImageTemplate>
                        <input type='radio' name='imageSel' value='https://img.lovepik.com/background/20211021/large/lovepik-blue-banner-background-image_500452484.jpg' onClick={(event) => setImgSel(event.currentTarget.value)} />
                        <img style={{ width: '60px', height: '60px' }} src='https://img.lovepik.com/background/20211021/large/lovepik-blue-banner-background-image_500452484.jpg' />
                      </ImageTemplate>
                    </ImageTemplateDiv>

                    <div style={{ marginBottom: '-60px', maxWidth: '60%' }}>
                      <EditorLabel>{imgSel}</EditorLabel>
                    </div>
                    <ButtonDiv>
                      <PrimaryButton onClick={() => { setShow2(!show2); setImgBackground('url(' + imgSel + ')') }}>Next</PrimaryButton>
                      <SecondaryButton onClick={() => { setShow2(!show2); setImgBackground('') }}>Cancel</SecondaryButton>
                    </ButtonDiv>
                  </ImageSelectDiv> : null
                }
              </InputGroupDiv>

              <InputGroupDiv>
                <EditorLabel>Opacity</EditorLabel>
                <InputRowDiv>
                  <SmallNumberInput
                    min={1}
                    max={100}
                    step={1}
                    value={opacityValue}
                    onChange={onOpacityChange}
                  /><RangeSlider
                    min={1}
                    max={100}
                    step={1}
                    onChange={onOpacityChange}
                    value={typeof opacityValue === 'number' ? opacityValue : 0}
                  />
                </InputRowDiv>
              </InputGroupDiv>

            </InputRowDiv>

            <TabHeaderDiv>
              <TabHeaderH5>Text Style</TabHeaderH5>
            </TabHeaderDiv>

            <EditorLabel>Font</EditorLabel>
            <FontSelect onChange={(event) => setFont(event.target.value)}>
              <option value='Inter'>Inter</option>
              <option value='Audiowide'>Audiowide</option>
            </FontSelect>

            <InputRowDiv>
              <InputGroupDiv>
                <EditorLabel>Text Color</EditorLabel>
                <ColorButton onClick={() => setShow1(!show1)}>
                  <ColorButtonPreview style={{ backgroundColor: txtcolor }}></ColorButtonPreview>
                  {txtcolor}
                  <FaCaretDown />
                </ColorButton>
                {
                  show1 ? <div style={{ zIndex: 1000, position: 'absolute' }}>
                    <StyledColorPicker
                      color={txtcolor}
                      onChangeComplete={(txtcolor) => { setTxtColor(txtcolor.hex) }} />
                  </div> : null
                }
              </InputGroupDiv>

              <InputGroupDiv>
                <EditorLabel>Size</EditorLabel>
                <InputRowDiv>
                  <SmallNumberInput
                    min={8}
                    max={32}
                    step={1}
                    value={sizeValue}
                    onChange={onSizeChange}
                  /><RangeSlider
                    min={8}
                    max={32}
                    step={1}
                    onChange={onSizeChange}
                    value={typeof sizeValue === 'number' ? sizeValue : 0}
                  />
                </InputRowDiv>
              </InputGroupDiv>

            </InputRowDiv>

          </ScrollableDiv>
        </Panel>
        <Panel title="Config Appearance">
          <ScrollableDiv>
            <TabHeaderDiv>
              <TabHeaderH5>Display on page</TabHeaderH5>
            </TabHeaderDiv>

            <StyledCheckbox indeterminate={indeterminate1} onChange={onCheckAllChange1} checked={checkAll1}> All page</StyledCheckbox>
            <StyledCheckboxGroup options={onPageOptions} value={checkedList1} onChange={onCheckboxChange1} />

            <TabHeaderDiv>
              <TabHeaderH5>Display on device</TabHeaderH5>
            </TabHeaderDiv>

            <StyledCheckbox indeterminate={indeterminate2} onChange={onCheckAllChange2} checked={checkAll2}> All</StyledCheckbox>
            <StyledCheckboxGroup options={onDeviceOptions} value={checkedList2} onChange={onCheckboxChange2} />
          </ScrollableDiv>
        </Panel>
      </Tabs>
    </EditorDiv>
  </div>
}

export default Home

const BannerTitleDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 0px 20px 10px;
  gap: 10px;

  width: 90%;
  height: 95px;

  background: #F6F6F7;
`
const BannerTitle = styled.input`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 5px 5px 10px;
  gap: 10px;

  width: 70%;
  height: 34px;
`
const BannerTitleSub = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.025em;

  color: rgba(29, 27, 41, 0.5);
`

const EditorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 40px 30px;
  gap: 10px;
  margin-top: 40px;

  height: 682px;

  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 6px;

  @media (min-width: 1200px) {
    width: 938px;
  }
`

const PreviewH5 = styled.h5`
  width: 95.09px;
  height: 9.35px;
  
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #1D1B29;
`

const BannerSection = styled.section`
  background-color: #1f1f1f;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  cursor: pointer;
  
  @media (min-width: 1200px) {
    height: 100px;
  }
`

const BannerText = styled.div`
  h3 {
    color: aliceblue;
    letter-spacing: 5px;
    font-family: 'Inter';
    font-size: 20px;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: right;
  
  margin-top: 40px;

  width: 100%;
  height: 27px;

  @media (min-width: 1200px) {
    margin-bottom: -50px;
  }
`

const PrimaryButton = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  display: inline-block;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;

  color: #F6F6F7;
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 20px;
  gap: 10px;

  width: 71px;
  height: 27px;

  cursor: pointer;

  background: #18A0FB;
  border-radius: 6px;
`

const SecondaryButton = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;

  color: #CACACA;

  box-sizing: border-box;

  display: inline-block;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 10px;
  gap: 10px;

  width: 71px;
  height: 27px;

  cursor: pointer;

  background: #FFFFFF;
  border: 1.5px solid #CACACA;
  border-radius: 6px;
`

const PanelTemplateDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`

const TemplateDiv = styled.div`
  width: 50%;
`

const BannerTemplate = styled.div`
  width: 90%;
  height: 30px;

  margin-bottom: 10px;
`

const InputRowDiv = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  width: 100%;
`

const InputGroupDiv = styled.div`
  margin-right: 10%;
`

const ImageSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 40px 30px;
  gap: 10px;
  margin-top: 40px;

  background: #FFFFFF;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  border-radius: 6px;

  width: 50%;
  height: 35%;

  position: absolute;
  left: 20%;
  top: 40%;
  z-index: 1000;
`

const ImageTemplateDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 11px 0px 20px 10px;
  gap: 10px;

  width: 95%;
  height: 100%;
`
const ImageSelectTitleDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 0px 20px 10px;
  gap: 10px;

  width: 95%;
  height: 10%;
`

const ImageTemplate = styled.label`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  span{
    background-color: lightgray;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: gray;

    cursor: pointer;
  }

  [type=file] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  }

  [type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  }

  [type=radio] + img {
    cursor: pointer;
  }

  [type=file] + img {
    cursor: pointer;
  }

  [type=radio]:checked + img {
    outline: 2px solid blue;
    border-radius: 5px;
  }
`

const ColorButton = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  margin-top: 10px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.03em;

  color: #1D1B29;

  width: 110px;
  height: 30px;

  cursor: pointer;

  background: #F6F6F7;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;
`

const ColorButtonPreview = styled.div`
  box-sizing: border-box;

  display: inline;
  margin-right: 20px;

  width: 21px;
  height: 20px;

  background: #000000;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;
`

const ImageButton = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  margin-top: 10px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.03em;

  color: #1D1B29;

  width: 140px;
  height: 30px;

  cursor: pointer;

  background: #F6F6F7;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;
`

const ImageButtonPreview = styled.div`
  box-sizing: border-box;
 
  display: inline;
  margin-right: 10px;

  width: 21px;
  height: 20px;

  background: #CACACA;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;
`

const RangeSlider = styled(Slider)`
  padding-top: 20px;
  width: 167px;
  height: 30px;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;

  margin-left: 20px;
  margin-top: 20px;

  cursor: pointer;
  touch-action: none;

  .ant-slider-rail {
  position: relative;
  height: 4px;
  background-color: lightgray;
  border-radius: 2px;
  transition: background-color 0.3s;
}

.ant-slider-track {
  position: absolute;
  height: 4px;
  background-color: black;
  border-radius: 2px;
  transition: background-color 0.3s;
  margin-top: -4px;
}

.ant-slider-handle {
  position: absolute;
  width: 14px;
  height: 14px;
  margin-top: -10px;
  background-color: #f6f6f7;
  border: solid 2px black;
  border-radius: 50%;
  box-shadow: 0;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.6s, transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.ant-slider-handle-dragging {
  z-index: 1;
}

.ant-slider-handle:focus {
  border-color: black;
  outline: none;
  box-shadow: 0 0 7px 5px rgba(0, 0, 0, 0.12);
}

.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
  border-color: black;
}

.ant-slider-step {
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
  pointer-events: none;
}
`

const SmallNumberInput = styled(InputNumber)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.03em;

  color: #1D1B29;
  
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 7px;
  gap: 5px;

  margin-top: 10px;

  width: 59px;
  height: 30px;

  background: #F6F6F7;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;

  .ant-input-number-input{
    background-color: #F6F6F7;
    border: transparent;
    width: 80%;
    text-align: right;
  }
  .ant-input-number-handler-wrap{
    position: relative;
    top: 0;
    right: 0;
    width: 10px;
    height: 60%;
    background: #f6f6f7;
    border-radius: 0 2px 2px 0;
    opacity: 50%;
    transition: opacity 0.24s linear 0.1s;
  }

  .ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-up-inner,
.ant-input-number-handler-wrap .ant-input-number-handler .ant-input-number-handler-down-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: auto;
  margin-right: 0;
  font-size: 7px;
}
`

const FontSelect = styled.select`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  margin-top: 10px;

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #1D1B29;
  
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 10px;
  gap: 10px;

  width: 50%;
  height: 25px;

  cursor: pointer;

  background: #FFFFFF;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;
`

const ScrollableDiv = styled.div`
  height: 400px;

  overflow: auto;
`

const TabHeaderDiv = styled.div`
  margin-bottom: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 5px;
  gap: 10px;

  width: 100%;
  height: 35px;

  border-bottom: 1.5px solid rgba(29, 27, 41, 0.1);
`

const TabHeaderH5 = styled.h5`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #1D1B29;
`

const EditorInputDiv = styled.div`
  margin-bottom: 20px;
`

const EditorLabel = styled.label`
  margin-top: 20px;
  height: 15px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: #1D1B29;
`

const EditorTextInput = styled.input`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 10px;
  gap: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  letter-spacing: 0.03em;

  margin: 0px 10px;

  color: #1D1B29;

  width: 40%;
  height: 25px;

  border: 1.5px solid rgba(29, 27, 41, 0.1);
`

const EditorNumberInput = styled.input`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  text-align: right;
  letter-spacing: 0.03em;

  color: #1D1B29;
  
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;

  width: 120px;
  height: 25px;

  border: 1.5px solid rgba(29, 27, 41, 0.1);
`

const StyledCheckbox = styled(Checkbox)`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
`
const StyledCheckboxGroup = styled(CheckboxGroup)`
  
  .ant-checkbox-group-item {

  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  }
`

const StyledColorPicker = styled(SketchPicker)`
  font-family: 'Inter';
`