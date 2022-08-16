import styled from "@emotion/styled";


export const Text = styled.div((props: { color?: string, fontSize?: number }) => ({
    fontSize: props.fontSize ? props.fontSize : 14,
    color: props.color && props.color
}));

export const Title = styled.div((props: { color?: string, fontSize?: number }) => ({
    fontWeight: "bold",
    fontSize: props.fontSize ? props.fontSize : 24,
    color: props.color && props.color
}));

export const Label = styled.div((props: { color?: string, fontSize?: number }) => ({
    marginTop: 16,
    fontWeight: "bold",
    fontSize: props.fontSize ? props.fontSize : 18,
    color: props.color && props.color
}));