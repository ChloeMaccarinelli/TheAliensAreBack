import pymongo
import csv
import json

## installer pymongo
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017')

db = client.geipan

geipan = db.geipan

filename = 'geipanDataTraitees.csv'
jsonCatalogue = 'geipanDataTraitees.json'

Data = {}

## Cleaning CatalogueTraitee.csv to be sure that it's empty ##
print("Cleaning geipanDataTraitees.json...")
with open(jsonCatalogue,"w") as file:
    file.write('')
    file.close()

## Creating Catalogue JSON ready to be imported to MongoDB ##
with open("geipanDataTraitees.csv","r") as csvFile:
    csvReader = csv.DictReader(csvFile)
    i = 0
    for line in csvReader:
        Data[str(i)] = line
        print(line)
        i = i + 1
    print(" ")
    print("## Copying " + str(i) + " lines from " + filename + " ##")

csvFile.close()

## Writing new JSON file with elements ##
with open(jsonCatalogue, 'a') as jsonFile:
    jsonFile.write(json.dumps(Data, indent=4))
jsonFile.close()

## Reading JSON file to import into MongoDB ##
with open(jsonCatalogue, 'r') as jsonFile:
    file_data = json.load(jsonFile)
    one_data = json.dumps(file_data, indent=1)
    ##getElement = file_data.get("1")
    ##print("Value : " + str(getElement))
    i = 0
    for element in range(0, len(file_data)):
        mongoResponse = geipan.insert_one(file_data.get(str(i)))
        i = i + 1
jsonFile.close()
