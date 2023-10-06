// Types
import { WRESTLER } from '../types';

// Interfaces
import Wrestler from '@/interfaces/wrestler';

const viewWrestler = (wrestler: Wrestler) => {
  return {
    type: WRESTLER.VIEW_WRESTLER,
    payload: wrestler
  }
}

const exitWrestler = () => {
  return {
    type: WRESTLER.EXIT_WRESTLER
  }
}

const WrestlerActions = {
  viewWrestler,
  exitWrestler
}

export default WrestlerActions;