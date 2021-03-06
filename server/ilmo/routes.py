from flask import Blueprint, request, jsonify

from ilmo import app
from ilmo import event as Event
from ilmo import registration as Registration

bp = Blueprint('ilmo', __name__, url_prefix='/api')


def get_response_code(response):
    if len(response['errors']) > 1:
        return 400

    return response['errors'][0]['status']


@bp.route('/events', methods=['GET'])
def get_events():
    """
    Retrieves all events from the database.
    """
    events, err = Event.get_events()
    # TODO: Handle error
    return jsonify({'events': events, 'errors': []})


@bp.route('/events', methods=['POST'])
def create_event():
    """
    Inserts a new event to the database.
    """

    response = {'event': None, 'errors': []}

    name = request.json.get('name', '')
    if not name:
        response['errors'].append({
            'status': 400,
            'source': 'name',
            'title': 'Name cannot be empty',
            'detail': 'Event must have a name that is not an empty string'
        })

        return jsonify(response), get_response_code(response)

    fields = request.json.get('fields', '')
    event_id, err = Event.create_event(name, fields)
    if type(err) == Event.EventInsertException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to insert new event',
            'detail': 'Event was not inserted into the database'
        })

        return jsonify(response), get_response_code(response)

    response['event'] = Event.get_event(event_id)
    return jsonify(response)


@bp.route('/events/<event_id>', methods=['GET'])
def get_event(event_id=None):
    """
    Retrieves a single event from the database.
    """

    response = {'event': None, 'errors': []}
    if not event_id:
        response['errors'].append({
            'status': 400,
            'source': 'event_id',
            'title': 'Event ID cannot be empty',
            'detail': 'Requested ID was not a valid event ID'
        })

        return jsonify(response), get_response_code(response)

    event, err = Event.get_event(event_id)
    # TODO: Handle error
    response['event'] = event
    return jsonify(response)


@bp.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id=None):
    """
    Removes a single event from the database.
    """

    response = {'event': None, 'errors': []}
    if not event_id:
        response['errors'].append({
            'status': 400,
            'source': 'event_id',
            'title': 'Event ID cannot be empty',
            'detail': 'Requested ID was not a valid event ID'
        })

        return jsonify(response), get_response_code(response)

    event, err = Event.get_event(event_id)
    # TODO: Handle error
    response['event'] = event
    return jsonify(response)


@bp.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id=None):
    """
    Updates a single event in the database.
    """

    response = {'event': None, 'errors': []}
    if not event_id:
        response['errors'].append({
            'status': 400,
            'source': 'event_id',
            'title': 'Event ID cannot be empty',
            'detail': 'Requested ID was not a valid event ID'
        })

    new_event = request.json.get('event', '')
    if not new_event:
        response['errors'].append({
            'status': 400,
            'source': 'event',
            'title': 'Cannot update with an empty event',
            'detail': 'New event cannot be empty'
        })

    if response['errors']:
        return jsonify(response), get_response_code(response)

    updated_event_id, err = Event.update_event(event_id, new_event)
    if type(err) == Event.EventUpdateException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to update event',
            'detail': 'Event was not updated'
        })

        return jsonify(response), get_response_code(response)

    event, err = Event.get_event(updated_event_id)
    # TODO: Handle error
    response['event'] = event
    return jsonify(response)


@bp.route('/events/<event_id>/registrations', methods=['GET'])
def get_event_registrations(event_id=None):
    """
    Retrieves all registrations of a certain event from the database.
    """

    response = {'registrations': [], 'errors': []}
    if not event_id:
        response['errors'].append({
            'status': 400,
            'source': 'event_id',
            'title': 'Event ID cannot be empty',
            'detail': 'Requested ID was not a valid event id'
        })

        return jsonify(response), get_response_code(response)

    registrations, err = Registration.get_event_registrations(event_id)
    # TODO: Handle error
    response['registrations'] = registrations
    return jsonify(response)


@bp.route('/registrations', methods=['GET'])
def get_registrations():
    """
    Retrieves all registrations from the database.
    """
    registrations, err = Registration.get_registrations()
    # TODO: Handle error
    return jsonify({
        'registrations': registrations,
        'errors': []
    })


@bp.route('/registrations', methods=['POST'])
def create_registration():
    """
    Inserts a new registration to the database
    """

    response = {'registration': None, 'errors': []}
    event_id = request.json.get('event_id', '')
    if not event_id:
        response['errors'].append({
            'status': 400,
            'source': 'event_id',
            'title': 'Event ID cannot be empty',
            'detail': 'Registration must have a valid event ID'
        })

        return jsonify(response), get_response_code(response)

    custom_fields = request.json.get('custom_fields', [])
    registration_id, err = Registration.create_registration(
        event_id,
        custom_fields
    )

    if type(err) == Registration.RegistrationInsertException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to insert a new registration',
            'detail': 'Registration was not inserted'
        })

        return jsonify(response), get_response_code(response)

    elif type(err) == Registration.RegistrationValidateException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to validate a new registration',
            'detail': 'Registration was not inserted. Invalid: {}'.format(
                err.invalid_fields
            )
        })

        return jsonify(response), get_response_code(response)

    registration, err = Registration.get_registration(registration_id)
    # TODO: Handle error
    response['registration'] = registration
    return jsonify(response)


@bp.route('/registrations/<registration_id>', methods=['GET'])
def get_registration(registration_id=None):
    """
    Retrieves a single registration
    """

    response = {'registration': None, 'errors': []}
    if not registration_id:
        response['errors'].append({
            'status': 400,
            'source': 'registration_id',
            'title': 'Registration ID cannot be empty',
            'detail': 'Registration ID is not valid'
        })

        return jsonify(response), get_response_code(response)

    registration, err = Registration.get_registration(registration_id)
    if err:
        response['errors'].append({
            'status': 404,
            'source': 'registration_id',
            'title': 'Registration ID not found',
            'detail': 'Registration with requested ID cannot be found'
        })

        return jsonify(response), get_response_code(response)

    # TODO: Handle error
    response['registration'] = registration
    return jsonify(response)


@bp.route('/registrations/<registration_id>', methods=['PUT'])
def update_registration(registration_id=None):
    """
    Updates a single registration in the database.
    """

    response = {'registration': None, 'errors': []}
    if not registration_id:
        response['errors'].append({
            'status': 400,
            'source': 'registration_id',
            'title': 'Registration ID cannot be empty',
            'detail': 'Registration ID is not valid'
        })

    new_registration = request.json.get('registration', '')
    if not new_registration:
        response['errors'].append({
            'status': 400,
            'source': 'registration',
            'title': 'Cannot update with an empty registration',
            'detail': 'New registration cannot be empty'
        })

    if response['errors']:
        return jsonify(response), get_response_code(response)

    updated_registration_id, err = Registration.update_registration(
        registration_id,
        new_registration
    )

    if type(err) == Registration.RegistrationUpdateException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to update registration',
            'detail': 'Registration was not updated'
        })

        return jsonify(response), get_response_code(response)

    registration, err = Registration.get_registration(updated_registration_id)
    # TODO: Handle error
    response['registration'] = registration

    return jsonify(response)

app.register_blueprint(bp)
