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
		case 'userDecided':
			return (
				<div>User Decided</div>
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
