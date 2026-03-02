import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CachedIcon from "@mui/icons-material/Cached";
import { symbolColors } from "client/themes/muiTheme";
import { WikiThumbnailOnclick } from "./wikiThumbnail.modul";
import useWikiStore from "client/stores/useWikiStore";
import { alpha } from "@mui/material/styles";
import { uuid } from "client/lib/uuid";

const RADIUS = 60; // 클릭버튼 너비
const ICON_SIZE = 30; // 메뉴 아이콘 크기

interface IRecipeFactor {
  num: number;
  resource: string;
}

export interface IwikiRecipeButton {
  ingredients: IRecipeFactor[];
  resource?: string;
}

const WikiRecipeButton = React.memo(
  ({ ingredients, resource = null }: IwikiRecipeButton) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
      !!resource &&
        !!ingredients?.find((ingredient) => ingredient?.resource === resource)
        ? resource
        : ingredients[0]?.resource,
    ); // 현재 선택된 아이템
    // const [hovered, setHovered] = useState(null); // 호버 중인 아이템 정보
    const [mainHovered, setMainHovered] = useState(false);

    const handleToggle = () => {
      setOpen((prev) => !prev);
    };
    const handleClose = () => {
      setOpen(false);
      // setHovered(null);
    };

    const anchorRef = useRef(null); // 버튼 위치 추적

    // const activeItem = hovered || selected; // 호버 중이면 호버 정보, 아니면 선택 정보 표시

    const handleBlur = (e) => {
      // [중요] 자식 요소(메뉴 아이콘들)를 클릭했을 때는 닫히지 않게 방어
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setOpen(false);
      }
    };

    // 배경 원의 지름 계산 (아이콘이 여유있게 들어가도록)
    const BG_SIZE = (RADIUS + ICON_SIZE) * 2;

    const addCard = useWikiStore((s) => s.addCard);

    const uid = uuid();

    return (
      <Box>
        <Box
          onBlur={handleBlur} // 포커스를 잃으면 실행
          tabIndex={0} // 포커스 가능하게 설정
          // onMouseEnter={() => {
          //   if (!open) setMainHovered(true);
          // }}
          // onMouseLeave={() => {
          //   if (!open) setMainHovered(false);
          // }}
          sx={{
            position: "relative",
            outline: "none", // 포커스 시 생기는 파란 테두리 제거
            display: "inline-flex",
            // cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",

            // 모바일 이슈로 상단 onMouse다 제거
            // 모바일 환경에선 회전효과 x
            "@media (hover: hover)": {
              "&:hover #innerHoverIconBox": {
                transform: "rotate(-180deg)",
                transition: "transform 0.4s ease-in-out",
              },
            },
          }}
        >
          {/* 메인 버튼 (중앙) 호버시 회전 애니메이션 */}
          <Box
            id={"innerHoverIconBox"}
            // <motion.div
            // animate={{ rotate: mainHovered ? -180 : 0 }}
            // transition={{ duration: mainHovered ? 0.4 : 0, ease: "easeInOut" }}
            sx={{
              position: "absolute",
              top: -9,
              left: -9,
              right: -9,
              bottom: -9, // 버튼보다 살짝 크게 배치

              pointerEvents: "none", // 버튼 클릭 방해 방지
              zIndex: 5,
            }}
          >
            <CachedIcon
              sx={{
                width: "100%",
                height: "100%",
                color: symbolColors["resource"],
              }}
            />
            {/* </motion.div> */}
          </Box>
          {/* 메인 버튼 (중앙) */}
          <Box
            ref={anchorRef}
            onClick={handleToggle}
            sx={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              zIndex: 4,
            }}
          >
            <WikiThumbnailOnclick
              id={selected}
              // onClick={handleToggle}

              borderRadius={"50%"}
            />
          </Box>

          {/* 원형 메뉴 아이템들 */}
          {open && (
            <>
              {/* 반투명 배경 (이걸 누르면 닫힘) */}
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                style={{
                  position: "absolute",
                  width: BG_SIZE,
                  height: BG_SIZE,
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0,0,0,0.2)", // 반투명
                  zIndex: 6,
                  backdropFilter: "blur(2px)",
                  cursor: "auto",
                }}
              />
              {/* 상세보기용 아이콘 */}
              <Box
                zIndex={7}
                sx={{
                  position: "absolute",
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  borderRadius: 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",

                  outline: `3px solid ${symbolColors["resource"]}`,
                }}
              >
                <WikiThumbnailOnclick
                  id={selected}
                  onClick={() => {
                    addCard(selected);
                  }}
                />
              </Box>

              <AnimatePresence>
                {/*원형 메뉴 아이템들 (버튼 위치 기준으로 띄움) */}
                {ingredients.map((ingredient, index) => {
                  // 각도 계산 (라디안)
                  const angle =
                    (index * (360 / ingredients.length) - 90) * (Math.PI / 180);
                  const x = Math.cos(angle) * RADIUS;
                  const y = Math.sin(angle) * RADIUS;

                  return (
                    <motion.div
                      key={
                        ingredient?.resource +
                        "radial" +
                        index +
                        ingredient?.num +
                        uid
                      }
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }} // 시작: 중앙에서 작게
                      animate={{ x, y, scale: 1, opacity: 1 }}
                      //   exit={{ x: 0, y: 0, scale: 0, opacity: 0 }} // 종료: 있는게 어색
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        //   delay: index * 0.05, // 순차적으로 나타나는 효과 있는게 어색
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 7,

                        left: "50%",
                        top: "50%",
                        marginLeft: -(ICON_SIZE / 2),
                        marginTop: -(ICON_SIZE / 2),
                      }}
                    >
                      <Box
                        // key={ingredient?.resource}
                        // onMouseEnter={() => setHovered(ingredient?.resource)}
                        // onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                          setSelected(ingredient?.resource);
                          handleClose();
                        }}
                        sx={{
                          position: "absolute",
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          "&:hover": { transform: "scale(1.2)" },

                          width: ICON_SIZE,
                          height: ICON_SIZE,
                          borderRadius: "50%",
                          // overflow: "hidden",
                          outline: `2px solid ${symbolColors["resource"]}`,
                        }}
                      >
                        <WikiThumbnailOnclick
                          borderRadius={"50%"}
                          id={ingredient?.resource}
                          onClick={() => {
                            setSelected(ingredient?.resource);
                            handleClose();
                          }}
                          // onClick={() => {}}
                        />
                        <Box
                          position={"absolute"}
                          right={-6}
                          top={-6}
                          // bgcolor={"background.paper" }
                          borderRadius={"50%"}
                          width={"20px"}
                          sx={{
                            // opacity: 0.5,
                            aspectRatio: "1/1",
                            pointerEvents: "none", // 버튼 클릭 방해 방지
                            backgroundColor: (theme) =>
                              alpha(theme.palette.background.paper, 0.5),
                          }}
                        >
                          <Typography
                            variant={"body2"}
                            textAlign={"center"}
                            fontWeight={800}
                          >
                            {ingredient?.num}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })}
                {/* </div> */}
              </AnimatePresence>
            </>
          )}
        </Box>
        <Typography
          mt={1}
          textAlign={"center"}
          variant={"body2"}
          fontWeight={700}
        >
          {
            ingredients?.find(
              (ingredient) => ingredient?.resource === selected,
            )["num"]
          }
        </Typography>
      </Box>
    );
  },
);

export default WikiRecipeButton;
