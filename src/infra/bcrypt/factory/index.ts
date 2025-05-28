import { BCryptAdapter } from "..";

export function bCryptAdapterFactory(): BCryptAdapter {
  return BCryptAdapter.getInstance();
}
