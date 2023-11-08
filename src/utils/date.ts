import { formatDistanceToNow as formatDistanceToNowDateFNS } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDistanceToNow = (date: Date) => {
  return formatDistanceToNowDateFNS(date, {
    addSuffix: true,
    locale: ptBR,
  })
}