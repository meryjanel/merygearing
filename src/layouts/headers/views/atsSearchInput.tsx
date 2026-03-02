import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  TextField,
  Autocomplete,
  InputAdornment,
  Box,
  Typography,
  useTheme,
  lighten,
  darken,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  atsDexieDbSchema,
  useAtsDexieContext,
} from "client/contexts/atsDexieContext";
import { useThemeContext } from "client/contexts/themeContext";
import { useTranslation } from "react-i18next";
import Hangul from "hangul-js";
import { iconSrc } from "client/lib/imgSrc";
import { nonScroll } from "client/themes/nonScroll";
import { thinScroll } from "client/themes/thinScroll";
import useWikiStore from "client/stores/useWikiStore";

const indexTableList = atsDexieDbSchema.stores
  .map((store) => store.storename)
  .filter((store) => store.includes("index"))
  .filter((store) => !store.includes("node")) //자원노드 제외
  .filter((store) => !store.includes("biome")); //바이옴 제외

const AtsSearchInput = (
  {
    // onSelect, lang, db
  },
) => {
  const theme = useTheme();

  const { t, i18n } = useTranslation(["name", "common"]);
  const locale = i18n.language;

  const { isDarkMode } = useThemeContext();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const { db } = useAtsDexieContext();

  const fetchSearch = useCallback(
    async (input: string) => {
      if (!input) {
        setOptions([]);
        return;
      }

      let fetchResults = [];

      const isInitial =
        (locale === "ko" || locale === "koa") && Hangul.isCho(input);

      // console.log("isInitial : ", isInitial);

      // 초성검색
      if (isInitial) {
        const fetchPromises = await indexTableList.map(async (indexTable) => {
          let fetchResult = await db[indexTable]
            .where("initial")
            .startsWith(input)
            .limit(3) //우선 3개 제한
            .toArray();
          if (fetchResult.length > 0) {
            fetchResult = fetchResult.map((result) => {
              return {
                ...result,
                type: indexTable.split("_")[0],
              };
            });
          }
          return fetchResult;
        });
        fetchResults = (await Promise.all(fetchPromises)).flat();
      } else {
        // 그냥검색
        const fetchPromises = await indexTableList.map(async (indexTable) => {
          let fetchResult = await db[indexTable]
            .where("name")
            .startsWith(input)
            .limit(3) //우선 3개 제한
            .toArray();
          if (fetchResult.length > 0) {
            fetchResult = fetchResult.map((result) => {
              return {
                ...result,
                type: indexTable.split("_")[0],
              };
            });
          }
          return fetchResult;
        });
        fetchResults = (await Promise.all(fetchPromises)).flat();
      }
      // 옵션에 넣기
      // console.log("fetchResults", fetchResults);
      const refinedFetch = fetchResults.map((fetchResult) => {
        return {
          id: fetchResult.id,
          name: fetchResult.name,
          type: fetchResult.type,
        };
      });
      // console.log(refinedFetch, "리파인");
      setOptions(refinedFetch);
    },
    [locale],
  );

  //
  const inputRef = useRef(null);
  const addCard = useWikiStore((s) => s.addCard);
  const onSelect = (id: string) => {
    addCard(id);
    inputRef.current?.querySelector("input").blur();
  };

  useEffect(() => {
    const tId = setTimeout(() => fetchSearch(inputValue), 150);
    return () => clearTimeout(tId);
  }, [inputValue]);

  // locale이 변경되면 입력값 리셋하기
  useEffect(() => {
    setInputValue("");
  }, [locale]);

  return (
    <Autocomplete
      clearOnBlur={false}
      fullWidth
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          // 포커스된 option있으면 그거 고르기
          const focusedOption = document.querySelector(
            '[role="option"].Mui-focused, [role="option"][aria-selected="true"]',
          );

          if (!!focusedOption) {
            (focusedOption as HTMLElement).click();
            event.preventDefault();
          }
          // 포커스된 옵션 없으면제일위에꺼
          else if (options.length > 0) {
            const option = options[0];
            onSelect(option.id);
            setInputValue(option.name);
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            event.preventDefault();
          }
        }
      }}
      onChange={(event, newValue) => {}}
      // 모바일에서 키보드 가림 방지를 위한 처리
      // ***추후 확인
      slotProps={{
        listbox: {
          sx: {
            py: 0,
            border: "1px solid",
            borderColor: "divider",
            maxHeight: "40vh",
            borderRadius: 2,
            ...nonScroll,
          },
        },
      }}
      groupBy={(option) => option.type}
      renderInput={(params) => (
        <TextField
          {...params}
          ref={inputRef}
          placeholder={t("common:search")}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,

              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
            },
          }}
        />
      )}
      renderGroup={(param) => (
        <Box key={"renderGroup" + param.group}>
          <Box
            color={theme.palette.primary.main}
            py={1}
            pl={1}
            bgcolor={
              !isDarkMode
                ? lighten(theme.palette.primary.main, 0.85)
                : darken(theme.palette.primary.main, 0.8)
            }
          >
            <Typography variant="body2">
              {t(`common:${param.group}`)}
            </Typography>
          </Box>
          <>{param.children}</>
        </Box>
      )}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            component="li"
            key={"renderOption_" + option.id}
            {...rest}
            onClick={() => {
              onSelect(option.id);
              setInputValue(option.name);
            }}
          >
            <Box
              minWidth={"30px"}
              width={"30px"}
              height={"30px"}
              overflow={"hidden"}
              borderRadius={1}
            >
              <img src={iconSrc(option.id)} draggable={false} />
            </Box>
            <Typography ml={1} variant="body2" noWrap={true}>
              {option.name}
            </Typography>
            {/* <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              ({option.name})
            </Typography> */}
          </Box>
        );
      }}
    />
  );
};

export default AtsSearchInput;
