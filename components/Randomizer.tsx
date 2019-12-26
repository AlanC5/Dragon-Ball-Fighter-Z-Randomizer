import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Picker } from 'react-native';
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
		neccessaryCharacter: constants.characters[Math.floor(Math.random() * constants.characters.length)].name
	};

	componentDidMount = () => {
		this.randomizeCharacters();
	};

	onChangeNeccessaryCharacter = (text: String) => {
		this.setState({
			neccessaryCharacter: text
		});
	};

	randomizeCharacters = () => {
		const player1CharacterList = [];
		const player2CharacterList = [];
		let allCharacterNames = [];
		// Generate a with numOfRandom characters and the neccessary character as at least one of them
		do {
			player1CharacterList.splice(0);
			player2CharacterList.splice(0);

			for (let i = 0; i < 2 * Randomizer.numOfRandoms; i++) {
				const characterObj = constants.characters[Math.floor(Math.random() * constants.characters.length)];

				// Alternate between players
				if (i % 2 == 0) {
					player1CharacterList.push(characterObj);
				} else {
					player2CharacterList.push(characterObj);
				}

				allCharacterNames.push(characterObj.name);
			}
		} while (!allCharacterNames.includes(this.state.neccessaryCharacter));

		this.setState({
			player1: player1CharacterList,
			player2: player2CharacterList
		});
	};

	renderInputs = (): JSX.Element => {
		return (
			<View style={styles.buttonWrapper}>
				<View style={styles.button}>
					<Picker
						selectedValue={this.state.neccessaryCharacter}
						style={{ height: 50, width: 300 }}
						onValueChange={this.onChangeNeccessaryCharacter}>
						{constants.characters.map((c, index) => {
							return <Picker.Item key={c.name + index} label={`${c.name}`} value={`${c.name}`} />;
						})}
					</Picker>
					<Button onPress={this.randomizeCharacters} title="Random!" />
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
				{this.renderInputs()}
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
