import React, { Component } from 'react'
import axios from 'axios'

class Member extends Component {
    constructor (props) {
        super(props)
        this.state = {
            member: {}
        }
    }
    async componentDidUpdate (prevProps) {
        if(prevProps.selectedMemberId !== this.props.selectedMemberId) {
        const member = (await axios.get(`/api/members/${this.props.selectedMemberId}`)).data
        this.setState( {member} )}
    }

    async componentDidMount () {
        const member = (await axios.get(`/api/members/${this.props.selectedMemberId}`)).data
        this.setState({member})
    }

    render () {
        const {member} = this.state
        return (
            <div>
                { member.bio }
            </div>
        )
    }
}

export default Member