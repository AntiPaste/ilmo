import os
import json
import logging
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--config', help='specify config file location')
args = parser.parse_args()
filepath = args.config

if not os.path.exists(filepath) or not os.path.isfile(filepath):
    raise EnvironmentError('No valid file specified: {}'.format(filepath))

with open(filepath, 'r') as config_file:
    config = json.load(config_file)
    logging.info('Loaded environment "{}"'.format(config['environment']))
