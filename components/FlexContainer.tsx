import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Randomizer from './Randomizer';

export default class FlexContainer extends Component {
	render = () => {
		return (
			<ScrollView
				style={{
					backgroundColor: '#fafafa',
					height: '100%',
					width: '100%'
				}}>
				<Randomizer />
			</ScrollView>
		);
	};
}
