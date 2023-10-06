// Redux Action Type
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { WRESTLER } from '../types';

// Interfaces
import Wrestler from '@/interfaces/wrestler';

const initialState = {
  currentWrestler: undefined
}

const WrestlerReducer = (state = initialState, action: PayloadAction<Wrestler>) => {
  switch (action.type) {
    case WRESTLER.VIEW_WRESTLER: {
      return {
        ...state,
        currentWrestler: action.payload
      }
    }

    case WRESTLER.EXIT_WRESTLER: {
      return {
        ...state,
        currentWrestler: undefined
      }
    }

    default: {
      return state;
    }
  }
}

export default WrestlerReducer;