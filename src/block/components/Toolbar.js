import TerminalWindow from './Terminal'
import CommandPrompt from './CommandPrompt'

const Toolbar = ( props ) => {
	switch (props.operatingSystem) {
		case 'macos':
			return (
				<TerminalWindow/>
			)
		case 'windows10':
			return (
				<CommandPrompt/>
			)
		case 'none':
			return null
		default:
			return (
				<TerminalWindow/>
			)
	}
}

export default Toolbar
