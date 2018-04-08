from . import connect
import time

surveydb = connect.DBConnect('survey')


def postSurvey(questions,user):
    print(user)

def getSurveys(surveyList):
    total = { 'active': [], 'closed': [], 'overview': {}}
    total['overview']['totalP'] = 0
    total['overview']['totalS'] = len(surveyList)
    now = time.time()
    for sID in surveyList:
        survey = surveydb.getDict('_id',sID)
        closeTime = survey['start']+survey['duration']
        total['overview']['totalP'] += survey['totalResponses']

        if closeTime >= now:
            total['active'].append({
                'opened': time.strftime('%m/%d/%Y %H:%M', time.localtime(survey['start'])),
                'title': survey['title'],
                'desc': survey['desc'],
                'questions': survey['questions'],
                'duration': survey['duration'],
                'closed': time.strftime('%m/%d/%Y %H:%M', time.localtime(closeTime)),
                'shareURL': survey['_id'],
                'rlen': survey['totalResponses'],
                'results': survey['results'],
                'qlen': len(survey['questions'])
            })
            if len(surveyList) == 1:
                return total['active'][0]
        else:
            total['closed'].append({
                'opened': time.strftime('%m/%d/%Y %H:%M', time.localtime(survey['start'])),
                'title': survey['title'],
                'desc': survey['desc'],
                'questions': survey['questions'],
                'duration': { 'epoch':survey['duration'], 'friendly': epoch2timespan(survey['duration'])},
                'closed': time.strftime('%m/%d/%Y %H:%M', time.localtime(closeTime)),
                'shareURL': survey['_id'],
                'rlen': survey['totalResponses'],
                'results': survey['results'],
                'qlen': len(survey['questions'])
            })
            if len(surveyList) == 1:
                return total['active'][0]
    avgP = total['overview']['totalP']/total['overview']['totalS']
    total['overview']['avgP'] = '{0:.1f}'.format(avgP)
    return total

def epoch2timespan(seconds):

    if seconds < 60:
        return str(seconds) + ' sec(s)'
    elif seconds < 60*60:
        return str(int(seconds/60)) + ' min(s)'
    elif seconds < 60*60*24:
        return str(int(seconds/60/24)) + ' hr(s)'
    elif seconds < 60*60*24*7:
        return str(int(seconds/60/24/7)) + ' day(s)'
    else:
        return str(int(seconds/60/24/52)) + ' Week(s)'
