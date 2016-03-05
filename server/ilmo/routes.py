from flask import request, jsonify

from ilmo import app
from ilmo import event
from ilmo import registration


@app.route('/events', methods=['GET'])
def get_events():
    """
    Retrieves all events from the database.
    """
    return jsonify({'events': event.get_all_events(), 'errors': []})


@app.route('/events', methods=['POST'])
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
        return jsonify(response)

    fields = request.json.get('fields', '')
    eid, err = event.create_event(name, fields)
    if type(err) == event.EventInsertionException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to insert new event',
            'detail': 'Event was not inserted into the database'
        })
        return jsonify(response)

    response['event'] = event.get_event(eid)
    return jsonify(response)


@app.route('/events/<eid>', methods=['GET'])
def get_event(eid=None):
    """
    Retrieves a single event from the database.
    """

    response = {'event': None, 'errors': []}
    if not eid:
        response['errors'].append({
            'status': 400,
            'source': 'eid',
            'title': 'Event id cannot be empty',
            'detail': 'Requested id was not valid event id'
        })
        return jsonify(response)

    response['event'] = event.get_event(eid)
    return jsonify(response)


@app.route('/events/<eid>', methods=['PUT'])
def update_event(eid=None):
    """
    Updates a single event in the database.
    """
    response = {'event': None, 'errors': []}
    if not eid:
        response['errors'].append({
            'status': 400,
            'source': 'eid',
            'title': 'Event id cannot be empty',
            'detail': 'Requested id was not valid event id'
        })
        return jsonify(response)

    new_event = request.json.get('event', '')
    if not new_event:
        response['errors'].append({
            'status': 400,
            'source': 'event',
            'title': 'Cannot update with empty event',
            'detail': 'New event cannot be empty'
        })
        return jsonify(response)

    updaetd_eid, err = event.update_event(eid, new_event)
    if type(err) == event.EventUpdateException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to update new event',
            'detail': 'Event was not updated'
        })
        return jsonify(response)
    response['event'] = event.get_event(updaetd_eid)
    return jsonify(response)


@app.route('/events/<eid>/registrations', methods=['GET'])
def get_registrations_of_event(eid=None):
    """
    Retrieves all registrations of certain event from the database.
    """
    response = {'registrations': [], 'errors': []}
    if not eid:
        response['errors'].append({
            'status': 400,
            'source': 'eid',
            'title': 'Event id cannot be empty',
            'detail': 'Requested id was not valid event id'
        })
        return jsonify(response)
    response['registrations'] = registration.get_registrations_of_event(eid)
    return jsonify(response)


@app.route('/registrations', methods=['GET'])
def get_registrations():
    """
    Retrieves all registrations from the database.
    """
    return jsonify({
        'registrations': registration.get_all_registrations(), 'errors': []
    })


@app.route('/registrations', methods=['POST'])
def create_registration():
    """
    Inserts a new registration to the database
    """
    response = {'registration': None, 'errors': []}
    eid = request.json.get('event_id', '')
    if not eid:
        response['errors'].append({
            'status': 400,
            'source': 'eid',
            'title': 'Event id cannot be empty',
            'detail': 'Registration must have valid event id'
        })
        return jsonify(response)
    custom_fields = request.json.get('custom_fields', [])
    rid, err = registration.create_registration(eid, custom_fields)
    if type(err) == registration.RegistrationInsertionException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to insert new registration',
            'detail': 'Registration was not inserted'
        })
        return jsonify(response)
    response['registration'] = registration.get_registration(rid)
    return jsonify(response)


@app.route('/registrations/<rid>', methods=['GET'])
def get_registration(rid=None):
    """
    Retrieves a single registration
    """
    response = {'registration': None, 'errors': []}
    if not rid:
        response['errors'].append({
            'status': 400,
            'source': 'rid',
            'title': 'Registration id cannot be empty',
            'detail': 'Registration id is not valid'
        })
        return jsonify(response)
    response['registration'] = registration.get_registration(rid)
    return jsonify(response)


@app.route('/registrations/<rid>', methods=['PUT'])
def update_registration(rid=None):
    """
    Updates a single registration in the database.
    """
    response = {'registration': None, 'errors': []}
    if not rid:
        response['errors'].append({
            'status': 400,
            'source': 'rid',
            'title': 'Registration id cannot be empty',
            'detail': 'Registration id is not valid'
        })
        return jsonify(response)

    new_registration = request.json.get('registration', '')
    if not new_registration:
        response['errors'].append({
            'status': 400,
            'source': 'registration',
            'title': 'Cannot update with empty registration',
            'detail': 'Updated registration cannot be'
        })
        return jsonify(response)

    updated_rid, err = registration.update_registration(rid, new_registration)
    if type(err) == registration.RegistrationUpdateException:
        response['errors'].append({
            'status': 500,
            'source': 'database',
            'title': 'Failed to update registration',
            'detail': 'Registration was not updated'
        })
        return jsonify(response)
    response['registration'] = registration.get_registration(updated_rid)
    return jsonify(response)
