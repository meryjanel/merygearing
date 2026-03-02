import { alpha, Box, Tooltip, Typography, useTheme } from "@mui/material";
import { iconSrc } from "client/lib/imgSrc";
import useWikiStore from "client/stores/useWikiStore";
import React from "react";
import { useTranslation } from "react-i18next";

interface iwikiThumb {
  id: string;
  onClick?: () => void;
  backgroundColor?: string;
  tooltipDirection?: string;
  disable?: boolean;
  borderRadius?: string | number;
}

export const WikiThumbnail = React.memo(
  ({ id, backgroundColor, borderRadius }: iwikiThumb) => {
    return (
      <img
        src={iconSrc(id)}
        draggable={false}
        style={{
          width: "100%",
          aspectRatio: "1/1",
          objectFit: "cover",
          borderRadius,
          backgroundColor: backgroundColor || "default",
        }}
      />
    );
  },
);

// 자료가 준비되지 않은 id들
const diabledId = [
  "res_drizzle_water",
  "res_clearance_water",
  "res_storm_water",
];

export const WikiThumbnailOnclick = React.memo(
  ({
    id,
    backgroundColor,
    tooltipDirection = "left",
    disable = false,
    borderRadius = 4,
    onClick,
  }: iwikiThumb) => {
    const theme = useTheme();
    const { t } = useTranslation("name");

    // 서비스와 빗물
    const innerDisabled = id.includes("sev_") || diabledId.includes(id);

    return (
      <Box
        position={"relative"}
        width={"100%"}
        height={"100%"}
        // m={2}
        onClick={() => {
          if (!disable && !innerDisabled && !!onClick) onClick();
        }}
        // onClick={onClick}
        sx={{
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0)", // 처음엔 투명
            // transition: "background-color 0.3s ease",
            zIndex: 1,
            borderRadius: 1,
          },

          "&:hover": {
            cursor: !disable && !innerDisabled ? "pointer" : "auto",
            "&::after": {
              bgcolor:
                !disable && !innerDisabled
                  ? alpha(theme.palette.action.hover, 0.2)
                  : "auto",
            },
            transform: !disable && !innerDisabled ? "scale(1.1)" : "auto",
          },

          // 툴팁용
          "&:hover .tooltip": {
            visibility: "visible",
            opacity: 1,
            transform: "translateY(5px)", // 살짝 내려오는 애니메이션
          },
        }}
      >
        <WikiThumbnail
          id={id}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
        />

        {/* 툴팁 */}
        <Typography
          className="tooltip"
          variant="caption"
          sx={{
            position: "absolute",
            top: "100%", // 아이콘 바로 아래 배치
            left: tooltipDirection === "left" ? 0 : "auto",
            right: tooltipDirection === "right" ? 0 : "auto",
            zIndex: 1972,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontSize: "11px",

            visibility: "hidden",
            opacity: 0,
            transition: "opacity 0.2s, transform 0.2s",
            pointerEvents: "none", // 텍스트 마우스 간섭 방지
          }}
        >
          {t(id)}
        </Typography>
      </Box>
    );
  },
);
