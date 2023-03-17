import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { ToggleButton } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import SquareIcon from '@mui/icons-material/Square'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PaidIcon from '@mui/icons-material/Paid'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import HexagonIcon from '@mui/icons-material/Hexagon'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CloseIcon from '@mui/icons-material/Close'
import SpaIcon from '@mui/icons-material/Spa'
import FavoriteIcon from '@mui/icons-material/Favorite'

const symbols = [
  CircleIcon,
  SquareIcon,
  StarIcon,
  ReportProblemIcon,
  PaidIcon,
  HexagonIcon,
  PanoramaFishEyeIcon,
  CropSquareIcon,
  CloseIcon,
  SpaIcon,
  FavoriteIcon,
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  FilterDramaIcon,
  InvertColorsIcon
]

const symbolKeys = [
  'CircleIcon',
  'SquareIcon',
  'StarIcon',
  'ReportProblemIcon',
  'PaidIcon',
  'HexagonIcon',
  'PanoramaFishEyeIcon',
  'CropSquareIcon',
  'CloseIcon',
  'SpaIcon',
  'FavoriteIcon',
  'ArrowDownwardIcon',
  'ArrowUpwardIcon',
  'FilterDramaIcon',
  'InvertColorsIcon'
]
const SymbolPicker = (props: any) => {
  const [selected, setSelected] = useState(15)

  function renderSymbols(id: number) {
    const handleSelect = (index: any) => {
      setSelected(index)
      props.setSymbol(symbolKeys[id])
    }
    const checkSelect = () => {
      return id === selected
    }

    let Icon = symbols[id]

    return (
      <Grid item xs={2} height={35} padding={1.5}>
        <ToggleButton
          value="check"
          selected={checkSelect()}
          onChange={() => {
            handleSelect(id)
          }}
          sx={{
            backgroundColor: 'white',
            height: 20,
            minWidth: 28,
            marginTop: 0,
            padding: 0,
            borderRadius: 0
          }}
        >
          <Icon />
        </ToggleButton>
      </Grid>
    )
  }

  return (
    <Box
      paddingRight={5}
      bgcolor="white"
      color="black"
      sx={{ width: 220, height: 120, border: '1px solid grey' }}
    >
      <Grid container spacing={3} paddingLeft={2.5} paddingTop={1.5}>
        {renderSymbols(0)}
        {renderSymbols(1)}
        {renderSymbols(2)}
        {renderSymbols(3)}
        {renderSymbols(4)}
        {renderSymbols(5)}
        {renderSymbols(6)}
        {renderSymbols(7)}
        {renderSymbols(8)}
        {renderSymbols(9)}
        {renderSymbols(10)}
        {renderSymbols(11)}
        {renderSymbols(12)}
        {renderSymbols(13)}
        {renderSymbols(14)}
      </Grid>
    </Box>
  )
}

export default SymbolPicker
