import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Character from './Character';
import constants from '../constants';

interface CharacterObject {
	name: string;
	image: number; // require loads a static image
}

export interface State {
	player1: Array<CharacterObject>; // Contains player's characters
	player2: Array<CharacterObject>; // Contains player's the characters
	neccessaryCharacter: String; // The character required to be in at least one section
}

export default class Randomizer extends Component<{}, State> {
	static numOfRandoms = 4;
	state = {
		player1: [],
		player2: [],
		neccessaryCharacter: ''
	};

	componentDidMount = () => {
		this.randomize();
	};

	randomize = () => {
		this.setState({
			player1: this.randomCharacters(),
			player2: this.randomCharacters()
		});
	};

	randomCharacters = (): Array<CharacterObject> => {
		const characterList = [];
		for (let i = 0; i < Randomizer.numOfRandoms; i++) {
			const characterObj = constants.characters[Math.floor(Math.random() * constants.characters.length)];
			characterList.push(characterObj);
		}

		return characterList;
	};

	renderRandomButton = (): JSX.Element => {
		return (
			<View style={styles.buttonWrapper}>
				<View style={styles.button}>
					<Button onPress={this.randomize} title="Random!" />
				</View>
			</View>
		);
	};

	renderPlayerCharacters = (playerName: String, playerCharacters: Array<CharacterObject>): JSX.Element => {
		const mappedCharacters = playerCharacters.map((c, index) => {
			return <Character key={c.name + index} name={c.name} image={c.image} />;
		});

		return (
			<View>
				<Text style={styles.playerName}>{playerName}</Text>
				{mappedCharacters}
			</View>
		);
	};

	render = () => {
		return (
			<View style={styles.container}>
				{this.renderRandomButton()}
				<View style={styles.characterColumns}>
					{this.renderPlayerCharacters('Player 1', this.state.player1)}
					{this.renderPlayerCharacters('Player 2', this.state.player2)}
				</View>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'center'
	},
	buttonWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 50
	},
	button: {
		width: 200
	},
	characterColumns: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 10
	},
	playerName: {
		textAlign: 'center'
	}
});
