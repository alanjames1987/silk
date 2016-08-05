$(info SILK_PRODUCT: $(SILK_PRODUCT))
$(info SILK_BOARD: $(SILK_BOARD))
$(info $(shell node -p "_=require('silk-core-version'); _.semver+' ('+_.branch+')'"))
$(info ============================================)

SILK_BUILD_FILES := $(dir $(lastword $(MAKEFILE_LIST)))

CLEAR_VARS += $(SILK_BUILD_FILES)node_module_clear_vars.mk
BUILD_NODE_MODULE := $(SILK_BUILD_FILES)node_module.mk

BUILD_SILK_EXECUTABLE := $(SILK_BUILD_FILES)silk_executable.mk
BUILD_SILK_SHARED_LIBRARY := $(SILK_BUILD_FILES)silk_shared_library.mk

TARGET_OUT_SILK := $(TARGET_OUT)/silk
TARGET_OUT_SILK_EXECUTABLES := $(TARGET_OUT_SILK)/bin
TARGET_OUT_SILK_SHARED_LIBRARIES := $(TARGET_OUT_SILK)/lib
TARGET_OUT_SILK_NODE_MODULES := $(TARGET_OUT_SILK)/node_modules
TARGET_OUT_SILK_MEDIA := $(TARGET_OUT_SILK)/media
