import { useCallback } from "react";
import { useIntl } from "react-intl";

export type ILang = (idJson: string) => string;

const useMultiLanguage = () => {
  const intl = useIntl();

  const lang = useCallback((idJson: string) => {
    return intl.formatMessage({ id: idJson });
  }, [intl]);

  return { intl, lang };
};

export default useMultiLanguage;
