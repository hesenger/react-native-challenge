import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { Paper, Subtitle, BodyText, Caption } from "material-bread";
import { Expander } from "./Expander";
import Status from "./Status";
import { LOAD_BLOCK_FAIL, LOAD_BLOCK_START } from "../constants/actionTypes";

const padZero = num => ("000" + num).slice(-3);

export const Block = ({ block }) => {
    return (<View style={blockStyles.container}>
        <BodyText style={blockStyles.id}>{padZero(block.attributes.index)}</BodyText>
        <BodyText style={blockStyles.body}>{block.attributes.data}</BodyText>
    </View>);
};

export const BlockStatus = ({ node }) => {
    console.log(node.blockStatus);
    if (node.blocksStatus === LOAD_BLOCK_FAIL)
        return (<BodyText>Failed to load blocks</BodyText>);

    if (node.blocksStatus === LOAD_BLOCK_START)
        return (<BodyText>Loading</BodyText>);

    return <></>;
};

const blockStyles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        padding: 8,
        marginTop: 10,
        borderRadius: 2
    },

    id: {
        fontSize: 10,
        color: colors.blue,
        letterSpacing: 1.5
    },

    body: {
        letterSpacing: .25,
        fontSize: 14,
        color: colors.text
    },

    status: {
        textAlign: 'center',
        color: colors.text
    }
});
