export const increment = (payload) => {
  return {
    type: "INCREMENT",
    payload,
  };
};

export const decrement = (payload) => {
  return {
    type: "DECREMENT",
    payload,
  };
};

export const addPatient = (payload) => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const addPatients = (payload) => {
  return {
    type: "ADD_ALL_PATIENTS",
    payload,
  };
};

export const resetPatients = (payload) => {
  return {
    type: "RESET_PATIENTS",
    payload,
  };
};
