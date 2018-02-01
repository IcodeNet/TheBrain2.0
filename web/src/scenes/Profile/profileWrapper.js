import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import userDetailsQuery from 'thebrain-shared/graphql/queries/userDetails'
import changePasswordMutation from 'thebrain-shared/graphql/queries/changePasswordMutation'
import currentUserQuery from 'thebrain-shared/graphql/queries/currentUser'
import { getGraphqlForSwitchUserIsCasual } from 'thebrain-shared/graphql/mutations/switchUserIsCasual'

export const profileWrapper = compose(
  connect(),
  graphql(currentUserQuery, {
    name: 'currentUser',
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(userDetailsQuery, {
    name: 'userDetails',
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(changePasswordMutation, {
    props: ({ mutate }) => ({
      submit: ({ oldPassword, newPassword }) => mutate({
        variables: {
          oldPassword,
          newPassword
        }
      })
    })
  }),
  getGraphqlForSwitchUserIsCasual(graphql)
)
