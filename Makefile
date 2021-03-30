PYTHON=python
OUTPUT=lenet5
EPOCH=5


all: train_export

train_export:
	${PYTHON} -m webmnist -o ${OUTPUT} -e ${EPOCH} --train --export

train:
	${PYTHON} -m webmnist -o ${OUTPUT} -e ${EPOCH} --train

export:
	${PYTHON} -m webmnist -o ${OUTPUT} -e ${EPOCH} --export