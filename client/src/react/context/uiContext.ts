import { createContext } from "react";
import { UiActionDTO, UiStateDTO } from "../../models";

export const UiContext = createContext<UiStateDTO | undefined>(undefined);
export const UiDispatchContext = createContext((action: UiActionDTO) => {});
