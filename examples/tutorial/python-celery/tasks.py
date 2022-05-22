from celery import Celery

celery = Celery('tasks', 
    broker='amqp://',
    backend='rpc://'
)

@celery.task(name='tasks.add')
def add(x, y):
    return x + y
