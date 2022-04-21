import { useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';

const formReducer = (state, action) => {


    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) continue;
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                };
            };
            if (action.inputClickedType === 'checkbox') {
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,
                        [action.inputId]: {
                            value: action.infoType === 'sendEmailMessage' && action.checked ? action.value : action.checked,
                            checked: action.checked,
                            isValid: action.isValid,
                        }
                    },
                    isValid: formIsValid
                }
            }
            else {
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,
                        [action.inputId]: {
                            value: action.value,
                            isValid: [action.inputId].isValid ? [action.inputId].isValid : action.isValid,
                        }
                    },
                    isValid: formIsValid
                }
            }

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default: return state;
    };
};



export const useForm = (initialInputs, initialFormValidity) => {
    const adminData = useSelector(state => state.adminData);

    const [formState, dispatch] = useReducer(formReducer,
        {
            inputs: initialInputs,
            isValid: initialFormValidity
        });

    const inputHandler = useCallback((id, value, checked, inputClickedType, isValid) => {
        dispatch(
            {
                type: 'INPUT_CHANGE',
                value,
                checked,
                isValid,
                inputClickedType,
                inputId: id,
                infoType: adminData.infoType
            }
        );
    }, [adminData.infoType]);

    const setFormData = useCallback((updatedInputs, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: updatedInputs,
            formIsValid: formValidity
        })
    }, [])
    return [formState, inputHandler, setFormData]
};