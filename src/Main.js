import React, { Component } from 'react'
import axios from 'axios'
import Member from './Member'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            selectedMemberId: ''
        }
        this.deleteMember = this.deleteMember.bind(this)
    }

    async componentDidMount() {
        const members = (await axios.get('/api/members')).data
        this.setState({members})
        window.addEventListener('hashchange', () => {
            this.setState({selectedMemberId: window.location.hash.slice(1)})
        })
        this.setState({selectedMemberId: window.location.hash.slice(1)})
    }

    deleteMember (deleteMemberId) {
        const members = this.state.members.filter(member => member.id !== deleteMemberId)
        this.setState({members: members, selectedMemberId: ''})
    }

    render () {
        const {members, selectedMemberId} = this.state
        return (
            <div>
                <h1><a href='#'>All Members</a></h1>
                <ul>
                    {members.map(member => {
                        return (
                            <li key={member.id}>
                                <a href={`#${member.id}`}>
                                    {member.name}
                                </a>
                                <button onClick = {() => this.deleteMember(member.id)}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    {
                        !!this.state.selectedMemberId && <Member selectedMemberId = { selectedMemberId}/>
                    }
                </div>
                
            </div>
        )
    }
}



export default Main