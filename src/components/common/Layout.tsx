import styled from "@emotion/styled";

export const Flex = styled.div((props: { flexDirection?: "row" | "column" }) => ({
    display: "flex",
    flexDirection: props.flexDirection ? props.flexDirection : "row",
    alignItems: "center",
}));