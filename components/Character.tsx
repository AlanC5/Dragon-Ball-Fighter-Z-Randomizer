import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export interface Props {
	name: string;
	image: number; // require loads a static image
}

export default class Character extends Component<Props> {
	generateImage = (): JSX.Element => {
		return <Image source={this.props.image} style={styles.image} />;
	};

	render = () => {
		return (
			<View style={styles.container}>
				{this.generateImage()}
				<Text style={styles.text}>{this.props.name}</Text>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	image: {
		height: 100,
		width: 100
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#333333',
		borderRadius: 8,
		height: 140,
		justifyContent: 'center',
		margin: 5,
		width: 120
	},
	text: {
		color: '#fff',
		fontSize: 14,
		marginTop: 5
	}
});
