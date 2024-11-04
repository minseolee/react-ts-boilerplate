import type Connector from "../../instances/Connector";
import type { FC } from "react";

interface PageDefaultProp {
	connector: Connector;
}

type GFC = FC<PageDefaultProp>;
type GFCWithProp<T> = FC<PageDefaultProp & T>;

export type { GFC, GFCWithProp };
